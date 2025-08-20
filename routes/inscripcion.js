const router = require('express').Router();
const inscripcionController = require('../controllers/inscripcion');
const { validateToken } = require('../middlewares/token');


router.get('/', validateToken, inscripcionController.getAllInscripciones);
router.get('/:idSocioPlan', validateToken, inscripcionController.getInscripcionById);
router.get('/:idGimnasio', validateToken, inscripcionController.getInscripcionesByIdGimnasio);
router.post('/', validateToken, inscripcionController.createInscripcion);
router.patch('/:idSocioPlan', validateToken, inscripcionController.updateInscripcion);
router.delete('/:idSocioPlan', validateToken, inscripcionController.deleteInscripcion);

module.exports = router;