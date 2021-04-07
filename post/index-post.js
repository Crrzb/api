const express = require('express');
const body_parser = require('body-parser');

const config = require('../config');
const post = require('./components/post/network');
const errors = require('../network/errors');
const app = express();

//body-parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Router
app.use('/api/post',post);
app.use(errors);


app.listen(config.post.port,()=>{
    console.log('[index js POST] SERVICIO POST escuchando en el puerto: ',config.post.port);
});
