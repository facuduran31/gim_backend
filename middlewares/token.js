const jwt = require('jsonwebtoken');
require('dotenv').config();


const secret = process.env.SECRET;

const generateToken = (usuario) => {
  return jwt.sign(usuario, secret, { expiresIn: '1h' });
}


const validateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (authHeader) {
    const token = authHeader.split(' ')[1];
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