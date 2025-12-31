const ingresoModel = require('../models/ingreso.js');
const ingresoSchema = require('../interfaces/ingreso.js');

class ingresoController {

    getAllIngresos = (req, res) => {
        try {
            ingresoModel.getAllIngresos((err, data) => {
                if (err) {
                    throw new Error('Error al obtener los ingresos');
                } else {
                    res.status(200).json(data);
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }

    getIngresosByIdGimnasio = (req, res) => {
        const idGimnasio = req.params.idGimnasio;
        try {
            ingresoModel.getIngresosByIdGimnasio(idGimnasio, (err, data) => {
                if (err) {
                    throw new Error('Error al obtener la inscripción');
                } else {
                    res.status(200).json(data[0]);
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });

        }

    }

    createIngreso = async (req, res) => {
        const ingreso = req.body;
            try {
                const ingresoValida = ingresoSchema.safeParse(ingreso);
                if (ingresoValida.success) {
                    ingreso.fechaIngreso = ingreso.fechaIngreso.split('T')[0];
                    ingresoModel.createIngreso(ingreso, (err, data) => {
                        if (err) {
                            throw new Error('Error al crear la ingreso');
                        } else {
                            res.status(201).json({ message: 'ingreso creada con éxito' });
                        }
                    });
                }
                else {
                    throw new Error(ingresoValida.error.errors[0].message);
                }
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }

    updateIngreso = (req, res) => {
        const ingreso = req.body;
        ingreso.idSocioPlan = req.params.idSocioPlan;

        try {
            const ingresoValida = ingresoSchema.safeParse(ingreso);

            if (ingresoValida.success) {
                ingreso.fechaIngreso = ingreso.fechaIngreso.split('T')[0];
                ingresoModel.updateIngreso(ingreso, (err, data) => {
                    if (err) {
                        throw new Error('Error al actualizar el ingreso');
                    } else {
                        res.status(200).json({ message: 'ingreso actualizado con éxito' });
                    }
                });
            }
            else {
                throw new Error(ingresoValida.error.errors[0].message);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });

        }

    }

    deleteIngreso = (req, res) => {
        const id = req.params.id;
        try {
            ingresoModel.deleteingreso(id, (err, data) => {
                if (err) {
                    console.log(err)

                    throw new Error('Error al eliminar el ingreso');
                } else {
                    res.status(200).json({ message: 'ingreso eliminado con éxito' });
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ingresoController();