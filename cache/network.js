const express = require('express');
const router = express.Router();

const response = require('../network/response');
const store = require('../store/redis');

router.get('/:tabla',list);
router.get('/:tabla/:id',get);
router.put('/:tabla',upsert);

async function list(req,res,next){
    const datos = await store.list(req.params.tabla);
    response.success(req,res,datos,200);
}
async function get(req,res,next){
    const datos = await store.get(req.params.tabla,req.params.id);
    response.success(req,res,datos,200);
}

async function upsert(req,res,next){
    const datos = await store.upsert(req.params.tabla,req.body);
    response.success(req,res,datos,200);
}



module.exports = router;