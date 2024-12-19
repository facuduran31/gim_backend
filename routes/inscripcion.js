const router = require('express').Router();
const inscripcionController = require('../controllers/inscripcion');
//const { validateToken } = require('../middlewares/token');


router.get('/', inscripcionController.getAllInscripciones);
router.get('/:idSocioPlan', inscripcionController.getInscripcionById);
router.post('/', inscripcionController.createInscripcion);
router.patch('/:idSocioPlan', inscripcionController.updateInscripcion);
router.delete('/:idSocioPlan', inscripcionController.deleteInscripcion);

module.exports = router;