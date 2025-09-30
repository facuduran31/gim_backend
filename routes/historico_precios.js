const router = require('express').Router();
const historicoPreciosController = require('../controllers/historico_precios');
const { validateToken } = require('../middlewares/token');

router.get('/', validateToken, historicoPreciosController.getAll);
router.get('/:id', validateToken, historicoPreciosController.getById);
router.get('/plan/:idPlan', validateToken, historicoPreciosController.getHistoricoByPlan);
router.post('/', validateToken, historicoPreciosController.create);
router.put('/:id', validateToken, historicoPreciosController.update);
router.delete('/:id', validateToken, historicoPreciosController.delete);


module.exports = router;
