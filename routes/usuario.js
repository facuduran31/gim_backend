const router = require('express').Router();
const usuarioController = require('../controllers/usuario');
const { validateToken } = require('../middlewares/token');

// ✅ Auth / sesión
router.post('/login', usuarioController.login);
router.post('/logout', usuarioController.logout);

// ✅ Perfil autenticado (cookie authToken)
router.get('/me', validateToken, usuarioController.me);

// ✅ Password reset
router.post('/request-password-reset', usuarioController.forgotPassword);
router.post('/password-reset', usuarioController.resetPassword);

// ✅ Email de contacto
router.post('/send-email', usuarioController.sendEmail);

// ✅ CRUD
router.get('/', validateToken, usuarioController.getAllUsuarios);
router.post('/', usuarioController.createUsuario);
router.get('/:id', validateToken, usuarioController.getUsuarioById);
router.put('/:id', validateToken, usuarioController.updateUsuario);
router.delete('/:id', validateToken, usuarioController.deleteUsuario);

module.exports = router;
