require('dotenv').config();

const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

require('./middlewares/passport');

const gimnasioRouter = require('./routes/gimnasio');
const usuarioRouter = require('./routes/usuario');
const socioRouter = require('./routes/socio');
const planRouter = require('./routes/plan');
const inscripcionRouter = require('./routes/inscripcion');
const historicoPreciosRouter = require('./routes/historico_precios');
const metodoPagoRouter = require('./routes/metodo_pago');
const pagoRouter = require('./routes/pago');
const ingresoRouter = require('./routes/ingreso');

const { generateToken } = require('./middlewares/token');

const app = express();

const frontUrl = process.env.FRONTEND_URL || 'http://localhost:4200';
const isProd = process.env.NODE_ENV === 'production';

function authCookieOptions() {
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24, // 24hs
  };
}

function userCookieOptions() {
  return {
    httpOnly: false,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24, // 24hs
  };
}

app.use(cookieParser());
app.use(express.json());

// ✅ CORS con cookies (credenciales)
app.use(
  cors({
    origin: [frontUrl, 'http://localhost:4200', 'http://127.0.0.1:4200'],
    credentials: true,
  })
);

// ✅ Session + Passport (para Google OAuth)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev_secret',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// ✅ Google OAuth
app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  if (!req.user) return res.status(404).send({ error: 'Usuario no encontrado' });

  // ✅ NO metas password en el token
  const payload = {
    idUsuario: req.user.idUsuario,
    mail: req.user.mail,
    nombre: req.user.nombre,
    apellido: req.user.apellido,
  };

  const token = generateToken(payload);
  const user = {
    id: payload.idUsuario,
    mail: payload.mail,
    nombre: payload.nombre,
    apellido: payload.apellido,
  };

  return (
    res
      .cookie('authToken', token, authCookieOptions())
      .cookie('user', JSON.stringify(user), userCookieOptions())
      // ✅ importante: el front valida /usuarios/me en esta ruta
      .redirect(`${frontUrl}/auth/callback`)
  );
});

// Routers
app.use('/gimnasios', gimnasioRouter);
app.use('/usuarios', usuarioRouter);
app.use('/socios', socioRouter);
app.use('/planes', planRouter);
app.use('/inscripciones', inscripcionRouter);
app.use('/historico-precios', historicoPreciosRouter);
app.use('/metodos-pago', metodoPagoRouter);
app.use('/pagos', pagoRouter);
app.use('/ingresos', ingresoRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor backend corriendo en puerto ${PORT}`));
