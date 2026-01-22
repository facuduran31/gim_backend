const router = require('express').Router();
const usuarioController = require('../controllers/usuario');
const { validateToken } = require('../middlewares/token');

router.get('/', validateToken, usuarioController.getAllUsuarios);
router.get('/:id', validateToken, usuarioController.getUsuarioById);
router.get('/me', validateToken, usuarioController.getMe);
router.post('/', usuarioController.createUsuario);
router.put('/:id', validateToken, usuarioController.updateUsuario);
router.delete('/:id', validateToken, usuarioController.deleteUsuario);
router.post('/login', usuarioController.login);
router.post('/logout', usuarioController.logout);
router.post('/request-password-reset', usuarioController.forgotPassword);
router.post('/password-reset', usuarioController.resetPassword);
router.post('/send-email', usuarioController.sendEmail);

module.exports = router;
