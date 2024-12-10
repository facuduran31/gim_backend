const inscripcionModel = require('../models/inscripcion');

class inscripcionController{

    getAllInscripciones = (req, res) => {
        inscripcionModel.getAllInscripciones((err, data) => {
            if(err){
                res.status(500).json({error: err});
            }else{
                res.status(200).json(data);
            }
        });
    }

    createInscripcion = (req, res) => {
        const inscripcion = req.body;
        inscripcionModel.createInscripcion(inscripcion, (err, data) => {
            if(err){
                res.status(500).json({error: err});
            }else{
                res.status(201).json({message: 'Inscripcion creada con éxito'});
            }
        });
    }

    updateInscripcion = (req, res) => {
        const inscripcion = req.body;
        inscripcion.idSocio= req.params.idSocio;
        inscripcion.idPlan= req.params.idPlan;
        inscripcionModel.updateInscripcion(inscripcion, (err, data) => {
            if(err){
                res.status(500).json({error: err});
            }else{
                res.status(200).json({message: 'Inscripcion actualizada con éxito'});
            }
        });
    }

    deleteInscripcion = (req, res) => {
        const idSocio= req.params.idSocio;
        const idPlan= req.params.idPlan;
        inscripcionModel.deleteInscripcion(idSocio, idPlan, (err, data) => {
            if(err){
                res.status(500).json({error: err});
            }else{
                res.status(200).json({message: 'Inscripcion eliminada con éxito'});
            }
        });
    }
}

module.exports = new inscripcionController();