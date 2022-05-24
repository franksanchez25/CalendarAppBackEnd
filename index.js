const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
var cors = require('cors')

const app = express();
dbConnection();


app.use(cors())


//directorio publico

app.use( express.static('public') );

app.use(express.json());



//rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
//TODO: CRUD:


app.listen(process.env.PORT, ()=>{
    console.log(`Escuchando en el puerto ${process.env.PORT}`)
})