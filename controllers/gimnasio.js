const gimnasioModel = require('../models/gimnasio');
const gimnasioSchema = require('../interfaces/gimnasio');

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
        const gimnasioValido = gimnasioSchema.safeParse(gimnasio);
        if (gimnasioValido.success) {
            gimnasioModel.createGimnasio(gimnasio, (err, data) => {
                if (err) {
                    res.status(500).json({ message: 'Error al crear el gimnasio' });
                } else {
                    res.json({ message: 'Gimnasio creado correctamente' });
                }
            });
        }
        else {
            res.status(400).json({ message: gimnasioValido.error.errors[0].message });
        }
    }

    updateGimnasio = (req, res) => {
        const gimnasio = req.body;
        gimnasio.id = parseInt(req.params.id);
        const gimnasioValido = gimnasioSchema.safeParse(gimnasio);
        if (gimnasioValido.success) {
            gimnasioModel.updateGimnasio(gimnasio, (err, data) => {
                if (err) {
                    res.status(500).json({ message: 'Error al actualizar el gimnasio' });
                    console.log(err);
                } else {
                    res.json({ message: 'Gimnasio actualizado correctamente' });
                }
            });
        }
        else {
            res.status(400).json({ message: gimnasioValido.error.errors[0].message });
        }


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