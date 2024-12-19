const gimnasioModel = require('../models/gimnasio');

class GimnasioController {
    getAllGimnasios = (req, res) => {
        gimnasioModel.getAllGimnasios((err, data) => {
            if (err) {
                res.status(500).json({ message: 'Error al obtener los gimnasios' });
            } else {
                res.json(data);
            }
        });
    }

    getGimnasioById = (req, res) => {
        const id = req.params.id;
        gimnasioModel.getGimnasioById(id, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Error al obtener el gimnasio' });
            } else {
                res.json(data);
            }
        });
    }


    getGimnasioByUser = (req, res) => {
        const idUsuario = req.params.idUsuario;
        gimnasioModel.getGimnasioByUser(idUsuario, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Error al obtener el gimnasio' });
            } else {
                res.json(data);
            }
        });
    }

    createGimnasio = (req, res) => {
        const gimnasio = req.body;
        gimnasioModel.createGimnasio(gimnasio, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Error al crear el gimnasio' });
            } else {
                res.json({ message: 'Gimnasio creado correctamente' });
            }
        });
    }

    updateGimnasio = (req, res) => {
        const gimnasio = req.body;
        gimnasio.id = req.params.id;
        gimnasioModel.updateGimnasio(gimnasio, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Error al actualizar el gimnasio' });
                console.log(err);
            } else {
                res.json({ message: 'Gimnasio actualizado correctamente' });
            }
        });
    }

    deleteGimnasio = (req, res) => {
        const id = req.params.id;
        gimnasioModel.deleteGimnasio(id, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Error al eliminar el gimnasio' });
            } else {
                res.json({ message: 'Gimnasio eliminado correctamente' });
            }
        });
    }
}

module.exports = new GimnasioController();