const router = require('express').Router();
const historicoPrecioController = require('../controllers/historicoPrecio');
const { validateToken } = require('../middlewares/token');


router.get('/', validateToken, historicoPrecioController.getAllHistoricosPrecio);
router.get('/:id', validateToken, historicoPrecioController.getHistoricoPrecioById);
router.post('/', validateToken, historicoPrecioController.createHistoricoPrecio);
router.put('/:id', validateToken, historicoPrecioController.updateHistoricoPrecio);
router.delete('/:id', validateToken, historicoPrecioController.deleteHistoricoPrecio);

module.exports = router;
