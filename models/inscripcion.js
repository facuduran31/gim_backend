const db = require('./db');

class inscripcionModel {
    getAllInscripciones = (callback) => {
        db.query('SELECT * FROM socio_plan', callback);
    }

    getInscripcionById = (idSocio, idPlan, callback) => {
        db.query('SELECT * FROM socio_plan WHERE idSocioPlan = ?', [idSocioPlan], callback);
    }

    createInscripcion = (inscripcion, callback) => {
        db.query('INSERT INTO socio_plan (idSocio, idPlan, fechaInicio, fechaFin) VALUES (?, ?, ?, ?)', [inscripcion.idSocio, inscripcion.idPlan, inscripcion.fechaInicio, inscripcion.fechaFin], callback);
    }

    updateInscripcion = (inscripcion, callback) => {
        db.query('UPDATE socio_plan SET fechaInicio = ?, fechaFin = ? WHERE idSocioPlan = ?', [inscripcion.fechaInicio, inscripcion.fechaFin, inscripcion.idSocioPlan,], callback);
    }

    deleteInscripcion = (idSocio, idPlan, callback) => {
        db.query('DELETE FROM socio_plan WHERE idSocioPlan = ?', [idSocio, idPlan], callback);
    }

}

module.exports = new inscripcionModel();