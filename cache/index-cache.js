const express = require('express');

const config = require('../config');
const router = require('./network');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


//rutas
app.use('/',router);



app.listen(config.cache_service.port, ()=> {
    console.log('[index js cache] Servicio cache escuchando en el puerto:',config.cache_service.port);
});