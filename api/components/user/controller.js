const nanoid = require('nanoid');
const auth = require('../auth');

const TABLA = 'user';

module.exports = function (injectedStore, injectedCache) {
    let cache = injectedCache;
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    if (!cache) {
        cache = require('../../../store/dummy');
    }

    async function list() {
        let users = await cache.list(TABLA);
        if(!users){
            console.log('controller user, NO estaba en cache buscando en db');
            users = await store.list(TABLA);
            cache.upsert(TABLA,users);
        } else {
            console.log('controller user, SI estaba en cache buscando en db');
        }
        return users;

        
        
    }

    function get(id) {
        return store.get(TABLA, id);
    }

    async function upsert(body) {
        const user = {
            name: body.name,
            username: body.username,
        }

        if (body.id) {
            user.id = body.id;
        } else {
            user.id = nanoid();
        }

        if (body.password || body.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password,
            })
        }

        return store.upsert(TABLA, user);
    }

    function follow(from, to) {
        return store.upsert(TABLA + '_follow', {
            user_from: from,
            user_to: to,
        });
    }

    async function following(user) {
        const join = {}
        join[TABLA] = 'user_to'; // { user: 'user_to' }
        const query = { user_from: user };
		
		return await store.query(TABLA + '_follow', query, join);
	}

    return {
        list,
        get,
        upsert,
        follow,
        following,
    };
}