const cors = require('cors');
const express = require('express');
const gimnasioRouter = require('./routes/gimnasio');
const usuarioRouter = require('./routes/usuario');
const socioRouter = require('./routes/socio');
const planRouter = require('./routes/plan');
const inscripcionRouter = require('./routes/inscripcion');

require('dotenv').config();
const port = process.env.PORT;


const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('hola');
})


//Definicón de rutas
app.use('/gimnasios', gimnasioRouter);
app.use('/usuarios', usuarioRouter);
app.use('/socios', socioRouter);
app.use('/planes', planRouter);
app.use('/inscripciones', inscripcionRouter);



//Levantar el servidor
app.listen(port, () => {
    console.log("Este es un pasito que le gusta a los turro baila pegaito a la pare olright", port);
})