const router = require('express').Router();
const SocioController = require('../controllers/socio');
//const { validateToken } = require('../middlewares/token');


router.get('/', SocioController.getAllSocios);
router.get('/:id', SocioController.getSocioById);
router.get('/gimnasio/:idGimnasio', SocioController.getSociosByGimnasio);
router.post('/', SocioController.createSocio);
router.put('/:id', SocioController.updateSocio);
router.delete('/:id', SocioController.deleteSocio);

module.exports = router;