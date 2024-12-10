const router = require('express').Router();
const SocioController = require('../controllers/socio');

router.get('/', SocioController.getAllSocios);
router.post('/', SocioController.createSocio);
router.put('/:id', SocioController.updateSocio);
router.delete('/:id', SocioController.deleteSocio);

module.exports = router;