const socioModel = require('../models/socio');


class SocioController{
    getAllSocios = (req, res) => {
        socioModel.getAllSocios((err, data) => {
            if(err){
                res.status(500).json({error: 'Error al obtener los socios'});
            }else{
                res.status(200).json(data);
            }
        })
    }

    getSocioById = (req, res) => {
        const id = req.params.id;
        socioModel.getSocioById(id, (err, data) => {
            if(err){
                res.status(500).json({error: 'Error al obtener el socio'});
            }else{
                res.status(200).json(data);
            }
        })
    }

    createSocio = (req, res) => {
        const socio = req.body;
        socioModel.createSocio(socio, (err, data) => {
            if(err){
                res.status(500).json({error: 'Error al crear el socio'});
            }else{
                res.status(201).json({message: 'Socio creado correctamente'});
            }
        })
    }

    updateSocio = (req, res) => {
        const socio = req.body;
        socio.id=req.params.id;
        socioModel.updateSocio(socio, (err, data) => {
            if(err){
                res.status(500).json({error: 'Error al actualizar el socio'});
            }else{
                res.status(200).json({message: 'Socio actualizado correctamente'});
            }
        })
    }

    deleteSocio = (req, res) => {
        const id = req.params.id;
        socioModel.deleteSocio(id, (err, data) => {
            if(err){
                res.status(500).json({error: 'Error al eliminar el socio'});
            }else{
                res.status(200).json({message: 'Socio eliminado correctamente'});
            }
        })
    }
}

module.exports = new SocioController();