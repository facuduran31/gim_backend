const router = require('express').Router();
const gimnasioController = require('../controllers/gimnasio');
//const { validateToken } = require('../middlewares/token');


router.get('/', gimnasioController.getAllGimnasios);
router.get('/:id', gimnasioController.getGimnasioById);
router.get('/user/:idUsuario', gimnasioController.getGimnasioByUser);
router.post('/', gimnasioController.createGimnasio);
router.put('/:id', gimnasioController.updateGimnasio);
router.delete('/:id', gimnasioController.deleteGimnasio);

module.exports = router;
