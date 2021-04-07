const bcrypt = require('bcrypt');


const auth = require('../../../auth');
const TABLA = 'auth';

module.exports = function(injectedStore) {
    let store = injectedStore;
    if(!store){
        store = require('../../../store/dummy');
    }

    async function login(username,password){
        const data = await store.query(TABLA,{username:username});
        
        return bcrypt.compare(password, data.password)
            .then(iguales => {
                if(iguales === true){
                    return auth.sign(data);
                } else {
                    throw new Error('[controller js : login] Datos invalidos');
                }
            })

        

    };

    async function upsert(data){
        let auth_data= {};
        if(data.id && data.username && data.password) {
            const hashedPass = await bcrypt.hash(data.password, 5);

            auth_data = {
                id:data.id,
                username:data.username,
                password: hashedPass
            };

        }
        

        return store.upsert(TABLA,auth_data);

        

        
    };

    return {
        upsert,
        login
    }


};