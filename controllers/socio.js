const socioModel = require('../models/socio');
const socioSchema = require('../interfaces/socio');


class SocioController {
    getAllSocios = (req, res) => {
        try {
            socioModel.getAllSocios((err, data) => {
                if (err) {
                    throw new Error('Error al obtener los socios');
                } else {
                    res.status(200).json(data);
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
        
    }

    getSocioById = (req, res) => {
        const id = req.params.id;
        try {
            socioModel.getSocioById(id, (err, data) => {
                if (err) {
                    throw new Error('Error al obtener el socio');
                } else {
                    res.status(200).json(data);
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
        
    }

    getSociosByGimnasio = (req, res) => {
        const idGimnasio = req.params.idGimnasio;
        try {
            socioModel.getSociosByGimnasio(idGimnasio, (err, data) => {
                if (err) {
                    throw new Error('Error al obtener los socios');
                } else {
                    res.status(200).json(data);
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
       
    }

    createSocio = (req, res) => {
        const socio = req.body;
        try {
            const socioValido = socioSchema.safeParse(socio);
            if (socioValido.success) {
                socioModel.createSocio(socio, (err, data) => {
                    if (err) {
                        throw new Error('Error al crear el socio');
                    } else {
                        res.status(201).json({ message: 'Socio creado correctamente' });
                    }
                })

            } else {
                throw new Error(socioValido.error.errors[0].message);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });            
        }
        
    }

    updateSocio = (req, res) => {
        const socio = req.body;
        try {
            socio.id = parseInt(req.params.id);
            const socioValido = socioSchema.safeParse(socio);
            if (socioValido.success) {
                socioModel.updateSocio(socio, (err, data) => {
                    if (err) {
                        throw new Error('Error al actualizar el socio');
                    } else {
                        res.status(200).json({ message: 'Socio actualizado correctamente' });
                    }
                })
            } else {
                throw new Error(socioValido.error.errors[0].message);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });            
        }
        
    }

    deleteSocio = (req, res) => {
        const id = req.params.id;
        try {
            socioModel.deleteSocio(id, (err, data) => {
                if (err) {
                    throw new Error('Error al eliminar el socio');
                } else {
                    res.status(200).json({ message: 'Socio eliminado correctamente' });
                }
            })
        } catch (error) {
            res.status(500).json({ error: error.message });            
        }
       
    }
}

module.exports = new SocioController();