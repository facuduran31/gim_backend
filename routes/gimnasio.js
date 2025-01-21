const router = require('express').Router();
const gimnasioController = require('../controllers/gimnasio');
const { upload } = require('../middlewares/multer');
const { validateToken } = require('../middlewares/token');


router.get('/', validateToken, gimnasioController.getAllGimnasios);
router.get('/:id', validateToken, gimnasioController.getGimnasioById);
router.get('/usuario/:idUsuario', validateToken, gimnasioController.getGimnasioByUser);
router.post('/', validateToken, upload.single('file'), gimnasioController.createGimnasio);
router.put('/:id', validateToken, upload.single('file'), gimnasioController.updateGimnasio);
router.delete('/:id', validateToken, gimnasioController.deleteGimnasio);

module.exports = router;
