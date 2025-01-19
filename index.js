const cors = require('cors');
const express = require('express');
const gimnasioRouter = require('./routes/gimnasio');
const usuarioRouter = require('./routes/usuario');
const socioRouter = require('./routes/socio');
const planRouter = require('./routes/plan');
const inscripcionRouter = require('./routes/inscripcion');
const passport = require('passport');
const session = require('express-session');
require('./middlewares/passport');
const {generateToken} = require('./middlewares/token');

require('dotenv').config();
const port = process.env.PORT;
const expressSessionSecret = process.env.EXPRESS_SESSION_SECRET;


const app = express();


//Middlewares
app.use(session({ secret: expressSessionSecret, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());



//LOGIN MANEJADO POR GOOGLE
  
  app.get('/auth/google',
    passport.authenticate('google', { scope: [ 'email', 'profile' ] }
  ));
  
  app.get( '/auth/google/callback', passport.authenticate("google",),(req, res)=> {
    if(req.user){
      const payload = req.user; //Hace falta mandar la contra o la puedo sacar?
      const token = generateToken(payload);
      res.json({ token, user: req.user });
    }
    else{
      res.status(404).send({ error: 'Usuario no encontrado' });
    }
     });





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