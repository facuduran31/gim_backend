const gimnasioModel = require('../models/gimnasio');
const gimnasioSchema = require('../interfaces/gimnasio');
const { deleteFile } = require('../middlewares/multer');

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
        gimnasio.idUsuario = parseInt(req.body.idUsuario);
        gimnasio.logo = req.file?.filename || undefined;
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
            if (gimnasio.logo) {
                deleteFile(req.file.filename);
            }
            console.log(gimnasioValido.error.errors[0].message);
            res.status(400).json({ message: gimnasioValido.error.errors[0].message });
        }
    }



    updateGimnasio = (req, res) => {
        const datosNuevos = req.body;
        if(datosNuevos.idUsuario){
            datosNuevos.idUsuario = parseInt(req.body.idUsuario);
        }

        datosNuevos.id = parseInt(req.params.id);
        datosNuevos.logo = req.file?.filename || undefined;


        gimnasioModel.getGimnasioById(datosNuevos.id, (err, gimnasio) => {
            if (err) {
                return res.status(500).json({ message: 'Error al actualizar el gimnasio' });
            }
            if (!gimnasio) {
                return res.status(404).json({ message: 'Gimnasio no encontrado' });
            }

            const gimnasioActualizado = {
                ...gimnasio[0], // Mantener los campos existentes
                ...datosNuevos // Sobrescribir con los datos enviados
            };
            console.log(gimnasio[0]);
            console.log(gimnasioActualizado);



            const gimnasioValido = gimnasioSchema.safeParse(gimnasioActualizado);
            if (gimnasioValido.success) {

                if (req.file && gimnasio[0].logo) {
                    deleteFile(gimnasio[0].logo);
                }

                gimnasioModel.updateGimnasio(gimnasioActualizado, (err, data) => {
                    if (err) {
                        res.status(500).json({ message: 'Error al actualizar el gimnasio' });
                        console.log(err);
                    } else {
                        res.json({ message: 'Gimnasio actualizado correctamente' });
                    }
                });
            }else {
                if(req.file){

                    deleteFile(req.file.filename);
                }
                res.status(400).json({ message: gimnasioValido.error.errors[0].message });
            }
        });
    }

    deleteGimnasio = (req, res) => {
        const id = req.params.id;


        gimnasioModel.getGimnasioById(id, (err, gimnasio) => {
            if (err) {
                return res.status(500).json({ message: 'Error al eliminar el gimnasio' });
            }

            if (!gimnasio) {
                return res.status(404).json({ message: 'Gimnasio no encontrado' });
            }

            if (gimnasio[0].logo) {
                deleteFile(gimnasio[0].logo);
            }




            gimnasioModel.deleteGimnasio(id, (err, data) => {
                if (err) {
                    res.status(500).json({ message: 'Error al eliminar el gimnasio' });
                } else {

                    res.json({ message: 'Gimnasio eliminado correctamente' });
                }
            });
        });
    }
}

module.exports = new GimnasioController();