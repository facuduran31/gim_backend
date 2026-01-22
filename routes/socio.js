const router = require('express').Router();
const SocioController = require('../controllers/socio');
const { validateToken } = require('../middlewares/token');

router.get('/', validateToken, SocioController.getAllSocios);
router.get('/:id', validateToken, SocioController.getSocioById);
router.get('/dni/:dni', validateToken, SocioController.getSocioByDni);
router.get('/gimnasio/:idGimnasio', validateToken, SocioController.getSociosByGimnasio);
router.get(
  '/gimnasio/:idGimnasio/con-plan-actual',
  validateToken,
  SocioController.getSociosByGimnasioConPlanActual
);
router.get('/ingreso/:dni', validateToken, SocioController.validarIngreso);
router.post('/', validateToken, SocioController.createSocio);
router.put('/:id', validateToken, SocioController.updateSocio);
router.delete('/:id', validateToken, SocioController.deleteSocio);

module.exports = router;
