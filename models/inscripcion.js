const db = require('./db');

class inscripcionModel{
    getAllInscripciones = (callback) => {
        db.query('SELECT * FROM socio_plan', callback);
    }

    getInscripcionById = (idSocio, idPlan, callback) => { //Ver si se puede hacer con un solo id
        db.query('SELECT * FROM socio_plan WHERE idSocio = ? AND idPlan = ?', [idSocio, idPlan], callback);
    }

    createInscripcion = (inscripcion, callback) => {
        db.query('INSERT INTO socio_plan (idSocio, idPlan, fechaInicio, fechaFin) VALUES (?, ?, ?, ?)', [inscripcion.idSocio, inscripcion.idPlan, inscripcion.fechaInicio, inscripcion.fechaFin], callback);
    }

    updateInscripcion = (inscripcion, callback) => { //Chequear fecha inicio / no es mejor crear un id unico?
        db.query('UPDATE socio_plan SET fechaInicio = ?, fechaFin = ? WHERE idSocio = ? AND idPlan = ?', [ inscripcion.fechaInicio, inscripcion.fechaFin, inscripcion.idSocio, inscripcion.idPlan,], callback);
    }

    deleteInscripcion = (idSocio, idPlan, callback) => {
        db.query('DELETE FROM socio_plan WHERE idSocio = ? AND idPlan = ?', [idSocio, idPlan], callback);
    }
   
}

module.exports = new inscripcionModel();