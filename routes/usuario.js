const router = require('express').Router();
const usuarioController = require('../controllers/usuario');

router.get('/', usuarioController.getAllUsuarios);
router.post('/', usuarioController.createUsuario);
router.put('/:id', usuarioController.updateUsuario);
router.delete('/:id', usuarioController.deleteUsuario);

module.exports = router;