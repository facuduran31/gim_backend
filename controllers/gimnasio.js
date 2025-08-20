const gimnasioModel = require('../models/gimnasio');
const gimnasioSchema = require('../interfaces/gimnasio');
const { deleteFile } = require('../middlewares/multer');

class GimnasioController {
    getAllGimnasios = (req, res) => {
        try {
            gimnasioModel.getAllGimnasios((err, data) => {
                if (err) {
                    throw new Error('Error al obtener los gimnasios');
                } else {
                    res.json(data);
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        
    }

    getGimnasioById = (req, res) => {
        const id = req.params.id;
        try {
            gimnasioModel.getGimnasioById(id, (err, data) => {
                if (err) {
                    throw new Error('Error al obtener el gimnasio');
                } else {
                    res.json(data[0]);
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        
    }


    getGimnasioByUser = (req, res) => {
        const idUsuario = req.params.idUsuario;
        try {
            gimnasioModel.getGimnasioByUser(idUsuario, (err, data) => {
                if (err) {
                    throw new Error('Error al obtener el gimnasio');
                } else {
                    res.json(data);
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
            
        }
       
    }

    createGimnasio = (req, res) => {
        const gimnasio = req.body;
        try {
            gimnasio.idUsuario = parseInt(req.body.idUsuario);
            gimnasio.logo = req.file?.filename || undefined;
            const gimnasioValido = gimnasioSchema.safeParse(gimnasio);
            if (gimnasioValido.success) {
                gimnasioModel.createGimnasio(gimnasio, (err, data) => {
                    if (err) {
                       throw new Error('Error al crear el gimnasio');
                    } else {
                        res.json({ message: 'Gimnasio creado correctamente' });
                    }
                });
            }
            else {
                if (gimnasio.logo) {
                    deleteFile(req.file.filename);
                }
                throw new Error(gimnasioValido.error.errors[0].message);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });     
        }
        
    }



    updateGimnasio = (req, res) => {
        const datosNuevos = req.body;
        try {
            if(datosNuevos.idUsuario){
                datosNuevos.idUsuario = parseInt(req.body.idUsuario);
            }
    
            datosNuevos.id = parseInt(req.params.id);
            datosNuevos.logo = req.file?.filename || undefined;

            gimnasioModel.getGimnasioById(datosNuevos.id, (err, gimnasio) => {
                if (err) {
                    throw new Error('Error al actualizar el gimnasio');
                }
                if (!gimnasio) {
                    throw new Error('Gimnasio no encontrado');
                }
    
                const gimnasioActualizado = {
                    ...gimnasio[0], // Mantener los campos existentes
                    ...datosNuevos // Sobrescribir con los datos enviados
                }; 
    
                const gimnasioValido = gimnasioSchema.safeParse(gimnasioActualizado);
                if (gimnasioValido.success) {
    
                    if (req.file && gimnasio[0].logo) {
                        deleteFile(gimnasio[0].logo);
                    }
    
                    gimnasioModel.updateGimnasio(gimnasioActualizado, (err, data) => {
                        if (err) {
                            throw new Error('Error al actualizar el gimnasio');
                        } else {
                            res.json({ message: 'Gimnasio actualizado correctamente' });
                        }
                    });
                }else {
                    if(req.file){
    
                        deleteFile(req.file.filename);
                    }
                    throw new Error(gimnasioValido.error.errors[0].message);
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });  
        }
    }

    deleteGimnasio = (req, res) => {
        const id = req.params.id;

        try {
            gimnasioModel.getGimnasioById(id, (err, gimnasio) => {
                if (err) {
                    throw new Error('Error al eliminar el gimnasio');
                }
    
                if (!gimnasio) {
                    throw new Error('Gimnasio no encontrado');
                }
    
                if (gimnasio[0].logo) {
                    deleteFile(gimnasio[0].logo);
                }
    
                gimnasioModel.deleteGimnasio(id, (err, data) => {
                    if (err) {
                        throw new Error('Error al eliminar el gimnasio');
                    } else {
    
                        res.json({ message: 'Gimnasio eliminado correctamente' });
                    }
                });
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        
    }
}

module.exports = new GimnasioController();