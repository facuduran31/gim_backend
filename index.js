const cors = require('cors');
const express = require('express');
const gimnasioRouter = require('./routes/gimnasio');
const usuarioRouter = require('./routes/usuario');
const socioRouter = require('./routes/socio');
const planRouter = require('./routes/plan');
const inscripcionRouter = require('./routes/inscripcion');
const pagoRouter = require('./routes/pago');
const passport = require('passport');
const session = require('express-session');
require('./middlewares/passport');
const { generateToken } = require('./middlewares/token');
const cookieParser = require('cookie-parser');
const historicoPreciosRoutes = require('./routes/historico_precios');
const metodoPagoRoutes = require('./routes/metodo_pago');
const pagoRoutes = require('./routes/pago');

//Variables de entorno
require('dotenv').config();
const port = process.env.PORT;
const expressSessionSecret = process.env.EXPRESS_SESSION_SECRET;
const frontUrl = process.env.FRONT_URL;


const app = express();


//Middlewares
app.use(cookieParser());
app.use(session({ secret: expressSessionSecret, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: frontUrl, // Permitir el origen del frontend
  credentials: true, // Permitir envío de cookies y cabeceras de autenticación
}));

app.use(express.json());



//LOGIN MANEJADO POR GOOGLE

app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }
  ));

app.get('/auth/google/callback', passport.authenticate("google",), (req, res) => {
  if (req.user) {
    const payload = req.user; //Hace falta mandar la contra o la puedo sacar?
    const token = generateToken(payload);
    const user = { id: req.user.idUsuario, mail: req.user.mail, nombre: req.user.nombre, apellido: req.user.apellido };

    res
      .cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 // 24 horas
      })
      .cookie('user', JSON.stringify(user), {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 // 24 horas
      })
      .redirect(`${frontUrl}/main`);
    // .send({ message: 'Sesión iniciada correctamente' }); ver si puedo usar esto mejor


  }
  else {
    res.status(404).send({ error: 'Usuario no encontrado' });
  }
});







//Definicón de rutas
app.use('/gimnasios', gimnasioRouter);
app.use('/usuarios', usuarioRouter);
app.use('/socios', socioRouter);
app.use('/planes', planRouter);
app.use('/inscripciones', inscripcionRouter);
app.use('/historico-precios', historicoPreciosRoutes);
app.use('/metodos-pago', metodoPagoRoutes);
app.use('/pagos', pagoRoutes);



//Levantar el servidor
app.listen(port, () => {
  console.log("Este es un pasito que le gusta a los turro baila pegaito a la pare olright", port);
})

