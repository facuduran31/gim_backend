const db = require('./db');

class SocioModel {

    getAllSocios(callback) {
        db.query('SELECT * FROM socio;', callback);
    }

    getSocioById(idSocio, callback) {
        db.query('SELECT * FROM socio WHERE idSocio = ?;', [idSocio], callback);
    }

    getSocioByDni(dni, callback) {
        db.query('SELECT * FROM socio WHERE dni = ?;', [dni], callback);
    }

    getSociosByGimnasio(idGimnasio, callback) {
        db.query('SELECT * FROM socio WHERE idGimnasio = ?;', [idGimnasio], callback);
    }

    createSocio(socio, callback) {
        const { dni, nombre, apellido, telefono, activo, idGimnasio } = socio;
        db.query(
            'INSERT INTO socio (dni, nombre, apellido, telefono, activo, idGimnasio) VALUES (?, ?, ?, ?, ?, ?);',
            [dni, nombre, apellido, telefono, activo, idGimnasio],
            callback
        );
    }

    updateSocio(socio, callback) {
        const { idSocio, dni, nombre, apellido, telefono, activo, idGimnasio } = socio;
        db.query(
            'UPDATE socio SET dni=?, nombre=?, apellido=?, telefono=?, activo=?, idGimnasio=? WHERE idSocio=?;',
            [dni, nombre, apellido, telefono, activo, idGimnasio, idSocio],
            callback
        );
    }

    deleteSocio(idSocio, callback) {
        db.query('DELETE FROM socio WHERE idSocio=?;', [idSocio], callback);
    }

    validarIngreso(dni, callback) {
        db.query('SELECT * FROM socio WHERE dni=?;', [dni], callback);
    }

    getUltimoPlan(idSocio, callback) {
        db.query(
            'SELECT * FROM socio_plan WHERE idSocio=? ORDER BY fechaFin DESC LIMIT 1;',
            [idSocio],
            callback
        );
    }

    createSocioPlan(socioPlan, callback) {
        const { idSocio, idPlan, fechaInicio, fechaFin } = socioPlan;
        db.query(
            'INSERT INTO socio_plan (idSocio, idPlan, fechaInicio, fechaFin) VALUES (?, ?, ?, ?);',
            [idSocio, idPlan, fechaInicio, fechaFin],
            callback
        );
    }

    updateSocioPlan(socioPlan, callback) {
        const { idSocioPlan, idPlan, fechaInicio, fechaFin } = socioPlan;
        db.query(
            'UPDATE socio_plan SET idPlan=?, fechaInicio=?, fechaFin=? WHERE idSocioPlan=?;',
            [idPlan, fechaInicio, fechaFin, idSocioPlan],
            callback
        );
    }

}

module.exports = new SocioModel();
