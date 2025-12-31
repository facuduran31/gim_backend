const router = require('express').Router();
const ingresoController = require('../controllers/ingreso');
const { validateToken } = require('../middlewares/token');


router.get('/', validateToken, ingresoController.getAllIngresos);
router.get('/:idGimnasio', validateToken, ingresoController.getIngresosByIdGimnasio);
router.post('/', validateToken, ingresoController.createIngreso);
router.patch('/:idIngreso', validateToken, ingresoController.updateIngreso);
router.delete('/:idIngreso', validateToken, ingresoController.deleteIngreso);

module.exports = router;