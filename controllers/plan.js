const planModel = require('../models/plan');

class planController{

    getAllPlanes = (req, res) => {
        planModel.getAllPlanes((err, data) => {
            if(err){
                res.status(500).json({error: err});
            }else{
                res.status(200).json(data);
            }
        });
    }

    createPlan = (req, res) => {
        const plan = req.body;
        planModel.createPlan(plan, (err, data) => {
            if(err){
                res.status(500).json({error: err});
            }else{
                res.status(201).json({message: 'Plan creado con éxito'});
            }
        });
    }

    updatePlan = (req, res) => {
        const plan = req.body;
        plan.id= req.params.id;
        planModel.updatePlan(plan, (err, data) => {
            if(err){
                res.status(500).json({error: err});
            }else{
                res.status(200).json({message: 'Plan actualizado con éxito'});
            }
        });
    }

    deletePlan = (req, res) => {
        const id = req.params.id;
        planModel.deletePlan(id, (err, data) => {
            if(err){
                res.status(500).json({error: err});
            }else{
                res.status(200).json({message: 'Plan eliminado con éxito'});
            }
        });
    }
}

module.exports = new planController();