const planModel = require('../models/plan');
const historicoPrecioModel = require('../models/historicoPrecio');
const planSchema = require('../interfaces/plan');
const e = require('cors');

class planController {

    getAllPlanes = (req, res) => {
        try {
            planModel.getAllPlanes((err, data) => {
                if (err) {
                    throw new Error('Error al obtener los planes');
                } else {
                    res.status(200).json(data);
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }

    getPlanById = (req, res) => {
        const id = req.params.id;
        try {
            planModel.getPlanById(id, (err, data) => {
                if (err) {
                    throw new Error('Error al obtener el plan');
                } else {
                    res.status(200).json(data);
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }

    getPlanesByGimnasio = (req, res) => {
        const idGimnasio = req.params.idGimnasio;
        try {
            planModel.getPlanesByGimnasio(idGimnasio, (err, data) => {
                if (err) {
                    throw new Error('Error al obtener los planes');
                } else {
                    res.status(200).json(data);
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }


    createPlan = (req, res) => {
        const plan = req.body;
        try {
            const planValido = planSchema.safeParse(plan);
            if (planValido.success) {
                planModel.createPlan(plan, (err, data) => {
                    if (err) {
                        throw new Error('Error al crear el plan');
                    } else {
                        planModel.getPlanByName(plan.nombre, (err, data) => {
                            if (err) {
                                throw new Error('Error al crear el plan');
                            } else {
                                const newHistoricoPrecio = { 'idPlan': data[0].id, 'precio': data[0].precio, 'fechaDesde': new Date().split('T')[0], 'fechaHasta': null }
                                historicoPrecioModel.createHistoricoPrecio(newHistoricoPrecio, (err, data) => {
                                    if (err) {
                                        throw new Error('Error al actualizar el histórico precio');
                                    } else {
                                        res.status(201).json({ message: 'Plan creado con éxito' });
                                    }
                                })
                            }
                        })
                    }
                });
            }
            else {
                throw new Error(planValido.error.errors[0].message);
            }
        } catch (error) {
            console.log(error);

            res.status(500).json({ error: error.message });
        }


    }

    updatePlan = (req, res) => {
        const plan = req.body;

        try {
            plan.id = parseInt(req.params.id);
            const planValido = planSchema.safeParse(plan);
            if (planValido.success) {
                planModel.updatePlan(plan, (err, data) => {
                    if (err) {
                        throw new Error('Error al actualizar el plan');
                    } else {
                        const newHistoricoPrecio = { 'idPlan': plan.id, 'precio': plan.precio, 'fechaDesde': new Date().split('T')[0], 'fechaHasta': null }
                        historicoPrecioModel.getLastHistoricoPrecio(newHistoricoPrecio.idPlan, (err, data) => {
                            if (err) {
                                throw new Error('Error al actualizar el histórico precio');
                            } else {
                                if (newHistoricoPrecio != data[0].precio) {
                                    historicoPrecioModel.createHistoricoPrecio(newHistoricoPrecio, (err, data) => {
                                        if (err) {
                                            throw new Error('Error al actualizar el histórico precio');
                                        }
                                    })
                                }
                            }
                        })
                        res.status(200).json({ message: 'Plan actualizado con éxito' });
                    }
                });
            }
            else {
                throw new Error(planValido.error.errors[0].message);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }


    deletePlan = (req, res) => {
        const id = req.params.id;
        try {
            planModel.deletePlan(id, (err, data) => {
                if (err) {
                    throw new Error('Error al eliminar el plan');
                } else {
                    res.status(200).json({ message: 'Plan eliminado con éxito' });
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }
}

module.exports = new planController();