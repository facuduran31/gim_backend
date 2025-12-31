const router = require('express').Router();
const ingresosController = require('../controllers/ingresos');
const { validateToken } = require('../middlewares/token');


router.get('/', validateToken, ingresosController.getAllIngresos);
router.get('/:idGimnasio', validateToken, ingresosController.getIngresosByIdGimnasio);
router.post('/', validateToken, ingresosController.createIngreso);
router.patch('/:idIngreso', validateToken, ingresosController.updateIngreso);
router.delete('/:idIngreso', validateToken, ingresosController.deleteIngreso);

module.exports = router;