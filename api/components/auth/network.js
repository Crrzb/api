const express = require('express');
const router = express.Router();

const response = require('../../../network/response');
const controller = require('./index');


router.post('/login',login);


function login(req,res){
    controller.login(req.body.username,req.body.password)
        .then(token => {
            response.success(req,res,token,200)
        })
        .catch(error => {
            response.error(req,res,'Error interno',400,error);
        })
};

module.exports = router;