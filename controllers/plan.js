const planModel = require('../models/plan');

const historicoPreciosModel = require('../models/historico_precios');

const planSchema = require('../interfaces/plan');

class planController {
    getAllPlanes = (req, res) => {
        try {
            planModel.getAllPlanes((err, data) => {
                if (err) throw new Error('Error al obtener los planes');
                res.status(200).json(data);
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }

    getPlanById = (req, res) => {
        const id = req.params.id;
        try {
            planModel.getPlanById(id, (err, data) => {
                if (err) throw new Error('Error al obtener el plan');
                res.status(200).json(data);
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }

    getPlanesByGimnasio = (req, res) => {
        const idGimnasio = req.params.idGimnasio;
        try {
            planModel.getPlanesByGimnasio(idGimnasio, (err, data) => {
                if (err) throw new Error('Error al obtener los planes');
                res.status(200).json(data);
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }

    getPlanActualByIdSocio = (req, res) => {
        const idSocio = req.params.idSocio;
        try {
            planModel.getPlanActualByIdSocio(idSocio, (err, data) => {
                if(err) throw new Error('Error al obtener el plan actual del socio');
                res.status(200).json(data[0]);
            });
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    createPlan = (req, res) => {
        const plan = req.body;
        try {
            const planValido = planSchema.safeParse(plan);

            if (!planValido.success) throw new Error(planValido.error.errors[0].message);

            planModel.createPlan(plan, (err, data) => {
                if (err) throw new Error('Error al crear el plan: ' + err);

                // 🔹 Insertar histórico de precios
                const idPlan = data.insertId; // id generado por el insert
                historicoPreciosModel.createHistoricoPrecio(
                    { idPlan, precio: plan.precio },
                    (err2) => {
                        if (err2) console.error('Error al guardar histórico de precios:', err2);
                    }
                );

                res.status(201).json({ message: 'Plan creado con éxito' });
            });
        } catch (error) {

            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    
    updatePlan = (req, res) => {
        const plan = req.body;
        plan.id = parseInt(req.params.id);


        try {
            const planValido = planSchema.safeParse(plan);
            if (!planValido.success) throw new Error(planValido.error.errors[0].message);

            // 🔹 Primero obtenemos el plan actual para ver si cambió el precio
            historicoPreciosModel.getUltimoHistoricoByPlan(plan.id, (err, oldData) => {
                if (err) throw new Error('Error al obtener el plan actual');
                let precioAnterior=0;
                if (oldData.length!=0){ 
                    precioAnterior= oldData[0].precio;
                }

                // Actualizamos el plan
                planModel.updatePlan(plan, (err2) => {
                    if (err2) throw new Error('Error al actualizar el plan');

                    // Si cambió el precio, insertamos en el histórico
                    if (plan.precio && plan.precio != precioAnterior) {
                        historicoPreciosModel.cerrarHistoricoPrecio(plan.id, (err3, data)=>{
                                if (err3) console.error('Error al cerrar histórico de precios:', err3);

                                historicoPreciosModel.createHistoricoPrecio(
                                    { idPlan: plan.id, precio: plan.precio },
                                    (err4) => {
                                        if (err4) console.error('Error al guardar histórico de precios:', err4);
                                    }
                                );

                        })
                        

                    }

                    res.status(200).json({ message: 'Plan actualizado con éxito' });
                });
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }


    deletePlan = (req, res) => {
        const id = req.params.id;
        try {

            planModel.deletePlan(id, (err) => {
                if (err) throw new Error('Error al eliminar el plan');
                res.status(200).json({ message: 'Plan eliminado con éxito' });
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }
}

module.exports = new planController();
