const express = require('express');

const config = require('../config');
const router = require('./network');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


//rutas
app.use('/',router);



app.listen(config.mysql_service.port, ()=> {
    console.log('[index js msql] Servicio mysql escuchando en el puerto:',config.mysql_service.port);
});