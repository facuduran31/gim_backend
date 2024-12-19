const inscripcionModel = require('../models/inscripcion');
const inscripcionSchema = require('../interfaces/inscripcion');

class inscripcionController {

    getAllInscripciones = (req, res) => {
        inscripcionModel.getAllInscripciones((err, data) => {
            if (err) {
                res.status(500).json({ error: 'Error al obtener las inscripciones' });
            } else {
                res.status(200).json(data);
            }
        });
    }

    getInscripcionById = (req, res) => {
        const idSocioPlan = req.params.idSocioPlan;
        inscripcionModel.getInscripcionById(idSocioPlan, (err, data) => {
            if (err) {
                res.status(500).json({ error: 'error al obtener la inscripcion' });
            } else {
                res.status(200).json(data);
            }
        });
    }

    createInscripcion = (req, res) => {
        const inscripcion = req.body;
        const inscripcionValida = inscripcionSchema.safeParse(inscripcion);
        if (inscripcionValida.success) {

            inscripcionModel.createInscripcion(inscripcion, (err, data) => {
                if (err) {
                    res.status(500).json({ error: err });
                } else {
                    res.status(201).json({ message: 'Inscripcion creada con éxito' });
                }
            });
        }
        else {
            res.status(400).json({ error: inscripcionValida.error.errors[0].message });
        }
    }


    updateInscripcion = (req, res) => {
        const inscripcion = req.body;
        inscripcion.idSocioPlan = req.params.idSocioPlan;
        const inscripcionValida = inscripcionSchema.safeParse(inscripcion);

        if (inscripcionValida.success) {
            inscripcionModel.updateInscripcion(inscripcion, (err, data) => {
                if (err) {
                    res.status(500).json({ error: err });
                } else {
                    res.status(200).json({ message: 'Inscripcion actualizada con éxito' });
                }
            });
        }
        else {
            res.status(400).json({ error: inscripcionValida.error.errors[0].message });
        }
    }

    deleteInscripcion = (req, res) => {
        const idSocioPlan = req.params.idSocioPlan;
        inscripcionModel.deleteInscripcion(idSocio, idPlan, (err, data) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({ message: 'Inscripcion eliminada con éxito' });
            }
        });
    }
}

module.exports = new inscripcionController();