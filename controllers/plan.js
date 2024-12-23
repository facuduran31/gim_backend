const planModel = require('../models/plan');
const planSchema = require('../interfaces/plan');
const e = require('cors');

class planController {

    getAllPlanes = (req, res) => {
        planModel.getAllPlanes((err, data) => {
            if (err) {
                res.status(500).json({ error: 'Error al obtener los planes' });
            } else {
                res.status(200).json(data);
            }
        });
    }

    getPlanById = (req, res) => {
        const id = req.params.id;
        planModel.getPlanById(id, (err, data) => {
            if (err) {
                res.status(500).json({ error: 'Error al obtener el plan' });
            } else {
                res.status(200).json(data);
            }
        }
        );
    }

    getPlanesByGimnasio = (req, res) => {
        const idGimnasio = req.params.idGimnasio;
        planModel.getPlanesByGimnasio(idGimnasio, (err, data) => {
            if (err) {
                res.status(500).json({ error: 'Error al obtener los planes' });
            } else {
                res.status(200).json(data);
            }
        });
    }


    createPlan = (req, res) => {
        const plan = req.body;
        const planValido = planSchema.safeParse(plan);
        if (planValido.success) {
            planModel.createPlan(plan, (err, data) => {
                if (err) {
                    res.status(500).json({ error: err });
                } else {
                    res.status(201).json({ message: 'Plan creado con éxito' });
                }
            });
        }
        else {
            res.status(400).json({ error: planValido.error.errors[0].message });
        }

    }

    updatePlan = (req, res) => {
        const plan = req.body;
        plan.id = parseInt(req.params.id);

        const planValido = planSchema.safeParse(plan);
        if (planValido.success) {
            planModel.updatePlan(plan, (err, data) => {
                if (err) {
                    res.status(500).json({ error: err });
                } else {
                    res.status(200).json({ message: 'Plan actualizado con éxito' });
                }
            });
        }
        else {
            res.status(400).json({ error: planValido.error.errors[0].message });
        }

    }

    deletePlan = (req, res) => {
        const id = req.params.id;
        planModel.deletePlan(id, (err, data) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({ message: 'Plan eliminado con éxito' });
            }
        });
    }
}

module.exports = new planController();