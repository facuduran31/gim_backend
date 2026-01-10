const router = require('express').Router();
const planController = require('../controllers/plan');
const { validateToken } = require('../middlewares/token');
const inscripcionController = require('../controllers/inscripcion')

router.get('/', validateToken, planController.getAllPlanes);
router.get('/:id', validateToken, planController.getPlanById);
router.get('/gimnasio/:idGimnasio', validateToken, planController.getPlanesByGimnasio);
router.get('/actual/:idSocio', validateToken, inscripcionController.getInscripcionActual);
router.post('/', validateToken, planController.createPlan);
router.put('/:id', validateToken, planController.updatePlan);
router.delete('/:id', validateToken, planController.deletePlan);

module.exports = router;