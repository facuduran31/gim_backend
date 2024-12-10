const router = require('express').Router();
const inscripcionController = require('../controllers/inscripcion');

router.get('/', inscripcionController.getAllInscripciones);
router.post('/', inscripcionController.createInscripcion);
router.patch('/:idSocio/:idPlan', inscripcionController.updateInscripcion);
router.delete('/:idSocio/:idPlan', inscripcionController.deleteInscripcion);

module.exports = router;