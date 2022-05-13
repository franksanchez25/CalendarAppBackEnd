const express = require('express');

const app = express();
dbConnection();




//directorio publico

app.use( express.static('public') );

app.use(express.json());