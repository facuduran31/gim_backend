const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const generateToken = (usuario) => {
  return jwt.sign(usuario, secret, { expiresIn: '1h' });
};

const validateToken = (req, res, next) => {
  let token = req.cookies?.authToken || req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  if (typeof token === 'string' && token.startsWith('Bearer ')) {
    token = token.slice('Bearer '.length).trim();
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(401).json({ message: 'Token no válido' });

    req.user = user;
    next();
  });
};

module.exports = { generateToken, validateToken };
