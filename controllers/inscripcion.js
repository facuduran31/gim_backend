const inscripcionModel = require('../models/inscripcion');
const inscripcionSchema = require('../interfaces/inscripcion');

class inscripcionController {

    getAllInscripciones = (req, res) => {
        try {
            inscripcionModel.getAllInscripciones((err, data) => {
                if (err) {
                    throw new Error('Error al obtener las inscripciones');
                } else {
                    res.status(200).json(data);
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }

    getInscripcionById = (req, res) => {
        const idSocioPlan = req.params.idSocioPlan;
        try {
            inscripcionModel.getInscripcionById(idSocioPlan, (err, data) => {
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


    getInscripcionesByIdGimnasio = (req, res) => {
        const idGimnasio = req.params.idGimnasio;
        try {
            inscripcionModel.getInscripcionesByIdGimnasio(idGimnasio, (err, data) => {
                if (err) {
                    throw new Error('Error al obtener las inscripciones');
                }
                else {
                    res.status(200).json(data);
                }
            })
        }
        catch (error) {
            res.status(500).json({ error: error.message });

        }
    }

    createInscripcion = (req, res) => {
        const inscripcion = req.body;
        try {
            const inscripcionValida = inscripcionSchema.safeParse(inscripcion);
            if (inscripcionValida.success) {
                inscripcion.fechaInicio=inscripcion.fechaInicio.split('T')[0];
                inscripcion.fechaFin=inscripcion.fechaFin.split('T')[0];
                inscripcionModel.createInscripcion(inscripcion, (err, data) => {

                    if (err) {
                        console.log(err)
                        throw new Error('Error al crear la inscripcion');
                    } else {
                        res.status(201).json({ message: 'Inscripcion creada con éxito' });
                    }
                });
            }
            else {
                throw new Error(inscripcionValida.error.errors[0].message);
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }

    }


    updateInscripcion = (req, res) => {
        const inscripcion = req.body;
        inscripcion.idSocioPlan = req.params.idSocioPlan;

        try {
            const inscripcionValida = inscripcionSchema.safeParse(inscripcion);

            if (inscripcionValida.success) {
                inscripcion.fechaInicio=inscripcion.fechaInicio.split('T')[0];
                inscripcion.fechaFin=inscripcion.fechaFin.split('T')[0];
                inscripcionModel.updateInscripcion(inscripcion, (err, data) => {
                    if (err) {
                        throw new Error('Error al actualizar la inscripcion');
                    } else {
                        res.status(200).json({ message: 'Inscripcion actualizada con éxito' });
                    }
                });
            }
            else {
                throw new Error(inscripcionValida.error.errors[0].message);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });

        }

    }

    deleteInscripcion = (req, res) => {
        const idSocioPlan = req.params.idSocioPlan;
        try {
            inscripcionModel.deleteInscripcion(idSocioPlan, (err, data) => {
                if (err) {
                    console.log(err)

                    throw new Error('Error al eliminar la inscripcion');
                } else {
                    res.status(200).json({ message: 'Inscripcion eliminada con éxito' });
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }
}

module.exports = new inscripcionController();