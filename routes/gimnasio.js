const gimnasioRouter = require('express').Router();
const gimnasioController = require('../controllers/gimnasio');

gimnasioRouter.get('/', gimnasioController.getAllGimnasios);
gimnasioRouter.post('/', gimnasioController.createGimnasio);
gimnasioRouter.put('/:id', gimnasioController.updateGimnasio);
gimnasioRouter.delete('/:id', gimnasioController.deleteGimnasio);

module.exports = gimnasioRouter;
