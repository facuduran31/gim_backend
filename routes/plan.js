const router = require('express').Router();
const planController = require('../controllers/plan');
//const { validateToken } = require('../middlewares/token');


router.get('/', planController.getAllPlanes);
router.get('/:id', planController.getPlanById);
router.post('/', planController.createPlan);
router.put('/:id', planController.updatePlan);
router.delete('/:id', planController.deletePlan);

module.exports = router;