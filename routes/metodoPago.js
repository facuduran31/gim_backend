const router = require('express').Router();
const metodoPagoController = require('../controllers/metodoPago');
const { validateToken } = require('../middlewares/token');


router.get('/', validateToken, metodoPagoController.getAllMetodosPago);
router.get('/:id', validateToken, metodoPagoController.getMetodoPagoById);
router.post('/', validateToken, metodoPagoController.createMetodoPago);
router.put('/:id', validateToken, metodoPagoController.updateMetodoPago);
router.delete('/:id', validateToken, metodoPagoController.deleteMetodoPago);

module.exports = router;
