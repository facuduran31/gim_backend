const router = require('express').Router();
const historicoPreciosController = require('../controllers/historico_precios');
const { validateToken } = require('../middlewares/token');

// Rutas
router.get('/', validateToken, historicoPreciosController.getAll);
router.get('/:id', validateToken, historicoPreciosController.getById);
router.post('/', validateToken, historicoPreciosController.create);
router.put('/:id', validateToken, historicoPreciosController.update);
router.delete('/:id', validateToken, historicoPreciosController.delete);

module.exports = router;
