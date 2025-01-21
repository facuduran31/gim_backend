const db = require('./db');

class inscripcionModel {
    getAllInscripciones = (callback) => {
        db.query('SELECT * FROM socio_plan', callback);
    }

    getInscripcionById = (idSocioPlan, callback) => {
        db.query('SELECT * FROM socio_plan WHERE idSocioPlan = ?', [idSocioPlan], callback);
    }

    createInscripcion = (inscripcion, callback) => {
        db.query('INSERT INTO socio_plan (idSocio, idPlan, fechaInicio, fechaFin) VALUES (?, ?, ?, ?)', [inscripcion.idSocio, inscripcion.idPlan, inscripcion.fechaInicio, inscripcion.fechaFin], callback);
    }

    updateInscripcion = (inscripcion, callback) => {
        db.query('UPDATE socio_plan SET fechaInicio = ?, fechaFin = ? WHERE idSocioPlan = ?', [inscripcion.fechaInicio, inscripcion.fechaFin, inscripcion.idSocioPlan,], callback);
    }

    deleteInscripcion = (idSocioPlan, callback) => {
        db.query('DELETE FROM socio_plan WHERE idSocioPlan = ?', [idSocioPlan], callback);
    }

}

module.exports = new inscripcionModel();