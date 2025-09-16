const router = require('express').Router();
const pagoController = require('../controllers/pago');
const { validateToken } = require('../middlewares/token');


router.get('/', validateToken, pagoController.getAllPagos);
router.get('/:id', validateToken, pagoController.getPagoById);
router.post('/', validateToken, pagoController.createPago);
router.put('/:id', validateToken, pagoController.updatePago);
router.delete('/:id', validateToken, pagoController.deletePago);

module.exports = router;
