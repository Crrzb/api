const express = require('express');
const router = express.Router();

const secure = require('./secure');
const response = require('../../../network/response');
const controller = require('./index');



//Routes
router.get('/',list);
router.get('/:id',get);
router.post('/',secure('post'),upsert);

//functions
function list(req,res,next){
    controller.list()
        .then(data => {
            response.success(req,res,data,200);
        })
        .catch(next);
};

function upsert(req,res,next){
    controller.upsert(req.body)
        .then(data => {
            response.success(req,res,data,201);
        })
        .catch(next);

};

function get(req,res,next){
    controller.get(req.params.id)
        .then(posts => {
            response.success(req,res,posts,200);
        })
        .catch(next);
}


module.exports = router;