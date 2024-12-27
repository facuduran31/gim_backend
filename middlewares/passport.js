const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const db = require('../models/db');
const { v4: uuidv4 } = require('uuid');



passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback", 
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
    
    db.query('SELECT * FROM usuario WHERE mail = ?', [profile.email], (err, user) => { //Chequea si el usuario ya existe en la base de datos
      if (err) { //Si hay un error, lo devuelve
        return done(err, false);
      }
      if (!err && user.length!=0) { //Si no hay error y el usuario ya existe, lo devuelve
        return done(null, user[0]);
      } else {
        const password = uuidv4();
        db.query('INSERT INTO usuario (mail, nombre, apellido, password) VALUES (?, ?, ?, ?)', [profile.email, profile.given_name, profile.family_name, password], (err, userAdded) => { //Si no existe, lo agrega a la base de datos
          if (err) { //Si hay un error, lo devuelve
            return done(err, false);
          } else {
            db.query('SELECT * FROM usuario WHERE mail = ?', [profile.email], (err, user) => { //Busca el usuario recién creado en la base de datos
              if (err) { //Si hay un error, lo devuelve
                return done(err, false);
              }
              return done(null, user[0]); //Si no hay error, devuelve el usuario
            });
          }});
      }
    });
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});