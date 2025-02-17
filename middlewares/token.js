const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const generateToken = (usuario) => {
  return jwt.sign(usuario, secret, { expiresIn: '1h' });
}


const validateToken = (req, res, next) => {

  const token = req.cookies?.authToken || req.headers['authorization'];
  if (token) {
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.status(401).json({ message: 'Token no válido' });
      } else {
        next();
      }
    });
  } else {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }
}

module.exports = { generateToken, validateToken };