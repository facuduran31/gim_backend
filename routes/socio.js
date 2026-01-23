const router = require('express').Router();
const SocioController = require('../controllers/socio');
const { validateToken } = require('../middlewares/token');

// ✅ RUTAS ESPECÍFICAS PRIMERO (evita que /:id se coma /dni o /gimnasio)
router.get('/dni/:dni', validateToken, SocioController.getSocioByDni);

router.get(
  '/gimnasio/:idGimnasio/con-plan-actual',
  validateToken,
  SocioController.getSociosByGimnasioConPlanActual
);

router.get('/gimnasio/:idGimnasio', validateToken, SocioController.getSociosByGimnasio);

router.get('/ingreso/:dni', validateToken, SocioController.validarIngreso);

// ✅ GENÉRICAS AL FINAL
router.get('/', validateToken, SocioController.getAllSocios);
router.get('/:id', validateToken, SocioController.getSocioById);

router.post('/', validateToken, SocioController.createSocio);
router.put('/:id', validateToken, SocioController.updateSocio);
router.delete('/:id', validateToken, SocioController.deleteSocio);

module.exports = router;
