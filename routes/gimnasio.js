const router = require('express').Router();
const gimnasioController = require('../controllers/gimnasio');

router.get('/', gimnasioController.getAllGimnasios);
router.post('/', gimnasioController.createGimnasio);
router.put('/:id', gimnasioController.updateGimnasio);
router.delete('/:id', gimnasioController.deleteGimnasio);

module.exports = router;
