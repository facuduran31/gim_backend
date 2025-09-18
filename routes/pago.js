const router = require('express').Router();
const pagoController = require('../controllers/pago');
const { validateToken } = require('../middlewares/token');

// Rutas
router.get('/', validateToken, pagoController.getAll);
router.get('/:id', validateToken, pagoController.getById);
router.post('/', validateToken, pagoController.create);
router.put('/:id', validateToken, pagoController.update);
router.delete('/:id', validateToken, pagoController.delete);

module.exports = router;
