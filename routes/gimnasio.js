const router = require('express').Router();
const gimnasioController = require('../controllers/gimnasio');
const { upload } = require('../middlewares/multer');
const { validateToken } = require('../middlewares/token');


router.get('/', gimnasioController.getAllGimnasios);
router.get('/:id', gimnasioController.getGimnasioById);
router.get('/usuario/:idUsuario', gimnasioController.getGimnasioByUser);
router.post('/', upload.single('file'), gimnasioController.createGimnasio);
router.patch('/:id', upload.single('file'), gimnasioController.updateGimnasio);
router.delete('/:id', validateToken, gimnasioController.deleteGimnasio);

module.exports = router;
