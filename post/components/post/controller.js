const { nanoid } = require('nanoid');

const TABLA = 'post';

module.exports = function(injectedStore) {
    let store = injectedStore;
    if(!store){
        store = require('../../../store/dummy');
    }

    function list(){
        return store.list(TABLA);
    };

    async function upsert(body){
        let post_id;
        if(body.post_id){
            post_id = body.post_id;
            let post = await store.get(TABLA,post_id);
        } else {
            post_id = nanoid();
        }

        let user = await store.get('user',body.user_id);
        if(user[0]){
            const post = {
                id: post_id,
                text: body.text,
                user: body.user_id
    
            }
            return store.upsert(TABLA,post);
        } else {
            throw new Error('ID DE USUARIO NO EXISTE');
        }

        
    }

    async function get(user){
        const join = {};
        join['user'] = 'user';
        const query = {user:user};
        return await store.query(TABLA,query,join);
    }
    return {
        list,
        upsert,
        get
    };
}


