const router = require('express').Router();
const pagoController = require('../controllers/pago');
const { validateToken } = require('../middlewares/token');

router.get('/socio-plan/:idSocioPlan', validateToken, pagoController.getBySocioPlan);
router.get('/socio/:idSocio', validateToken, pagoController.getBySocio);

router.get('/', validateToken, pagoController.getAll);
router.get('/:id', validateToken, pagoController.getById);

router.post('/', validateToken, pagoController.create);
router.delete('/:id', validateToken, pagoController.delete);

module.exports = router;
