const jwt = require('jsonwebtoken');

function extractToken(req) {
  // 1) Cookie (preferred)
  const cookieToken = req.cookies?.authToken;
  if (cookieToken) return cookieToken;

  // 2) Authorization header: Bearer <token>
  const auth = req.headers.authorization;
  if (!auth) return null;

  const parts = auth.split(' ');
  if (parts.length === 2 && parts[0] === 'Bearer') return parts[1];

  return null;
}

function validateToken(req, res, next) {
  try {
    const token = extractToken(req);

    if (!token) {
      return res.status(401).json({ message: 'Token requerido' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // payload disponible para controllers
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
}

function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = {
  validateToken,
  generateToken,
};
