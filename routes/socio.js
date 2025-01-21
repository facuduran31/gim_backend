const router = require('express').Router();
const SocioController = require('../controllers/socio');
const { validateToken } = require('../middlewares/token');


router.get('/', validateToken, SocioController.getAllSocios);
router.get('/:id', validateToken, SocioController.getSocioById);
router.get('/gimnasio/:idGimnasio', validateToken, SocioController.getSociosByGimnasio);
router.post('/', validateToken, SocioController.createSocio);
router.put('/:id', validateToken, SocioController.updateSocio);
router.delete('/:id', validateToken, SocioController.deleteSocio);

module.exports = router;