const router = require('express').Router();
const usuarioController = require('../controllers/usuario');
//const { validateToken } = require('../middlewares/token');

router.get('/', usuarioController.getAllUsuarios);
router.get('/:id', usuarioController.getUsuarioById);
router.post('/', usuarioController.createUsuario);
router.put('/:id', usuarioController.updateUsuario);
router.delete('/:id', usuarioController.deleteUsuario);
router.post('/login', usuarioController.login);

module.exports = router;