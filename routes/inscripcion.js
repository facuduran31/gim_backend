const router = require('express').Router();
const inscripcionController = require('../controllers/inscripcion');
//const { validateToken } = require('../middlewares/token');


router.get('/', inscripcionController.getAllInscripciones);
router.get('/:idSocio/:idPlan', inscripcionController.getInscripcionById);
router.post('/', inscripcionController.createInscripcion);
router.patch('/:idSocio/:idPlan', inscripcionController.updateInscripcion);
router.delete('/:idSocio/:idPlan', inscripcionController.deleteInscripcion);

module.exports = router;