const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');
const secret = config.jwt.secret;


function sign(data){
    data = JSON.parse(JSON.stringify(data));
    return jwt.sign(data,secret);
};

function verify(token) {
    return jwt.verify(token,secret)
}

const check = {
    own: function(req,owner){
        const decoded = decodedHeader(req);

        //Comprobar si es o no propio
        if(decoded.id !== owner){
            throw error('No autorizado', 401);
        }
    },
    logged: function(req){
        const decoded = decodedHeader(req);

    },

    
};

function getToken(auth){
    if(!auth) {
        throw new Error('No token')
    }
    if(auth.indexOf('Bearer ') === -1){
        throw new Error('Formato invalido');
    }

    let token = auth.replace('Bearer ', '');
    return token;
};

function decodedHeader(req){
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
};

module.exports = {
    sign,
    check

};