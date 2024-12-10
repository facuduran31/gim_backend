const router = require('express').Router();
const planController = require('../controllers/plan');

router.get('/', planController.getAllPlanes);
router.post('/', planController.createPlan);
router.put('/:id', planController.updatePlan);
router.delete('/:id', planController.deletePlan);

module.exports = router;