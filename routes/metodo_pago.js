const router = require('express').Router();
const metodoPagoController = require('../controllers/metodo_pago');
const { validateToken } = require('../middlewares/token');

// Rutas
router.get('/', validateToken, metodoPagoController.getAll);
router.get('/:id', validateToken, metodoPagoController.getById);
router.post('/', validateToken, metodoPagoController.create);
router.put('/:id', validateToken, metodoPagoController.update);
router.delete('/:id', validateToken, metodoPagoController.delete);

module.exports = router;
