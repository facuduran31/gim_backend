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
const cookieParser = require('cookie-parser');

require('dotenv').config();
const port = process.env.PORT;
const expressSessionSecret = process.env.EXPRESS_SESSION_SECRET;


const app = express();


//Middlewares
app.use(cookieParser());
app.use(session({ secret: expressSessionSecret, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: 'http://localhost:4200', // Permitir el origen del frontend
  credentials: true, // Permitir envío de cookies y cabeceras de autenticación
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
}));

app.options('*', cors({
  origin: 'http://localhost:4200',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());



//LOGIN MANEJADO POR GOOGLE
  
  app.get('/auth/google',
    passport.authenticate('google', { scope: [ 'email', 'profile' ] }
  ));
  
  app.get( '/auth/google/callback', passport.authenticate("google",),(req, res)=> {
    if(req.user){
      const payload = req.user; //Hace falta mandar la contra o la puedo sacar?
      const token = generateToken(payload);
      const user = {id:req.user.idUsuario, mail:req.user.mail, nombre:req.user.nombre, apellido:req.user.apellido};

      res
          .cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
            sameSite: 'strict',
          })
          .cookie('user', JSON.stringify(user), {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
            sameSite: 'strict',
          })
          .redirect(`http://localhost:4200/main`);
      
    }
    else{
      res.status(404).send({ error: 'Usuario no encontrado' });
    }
     });

  app.post('/logout', (req, res) => {
    //HAY QUE BORRAR LAS COOKIES
    req.logout(function(err) {
      if (err) { return next(err); }
      req.session.destroy();
      res
        .clearCookie('authToken',{path: '/', domain:'localhost', httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production'})
        .clearCookie('user',{path: '/', domain:'localhost', httpOnly: false, sameSite: 'strict', secure: process.env.NODE_ENV === 'production'})
        .send({ message: 'Sesión cerrada correctamente' });
    });
   
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

