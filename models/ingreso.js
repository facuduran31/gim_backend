const db = require('./db.js');

class IngresoModel {
    getAllIngresos = (callback) => {
        db.query('SELECT * FROM ingreso', callback);
    }

    getIngresosByIdGimnasio = (id, callback) => {
        db.query(
            'SELECT * FROM ingreso WHERE idGimnasio = ? ORDER BY fechaIngreso ASC',
            [id],
            callback
        );
    }

    getSocioByDni = (dni, idGimnasio, callback) => {
        db.query(
            "SELECT * FROM socio WHERE dni = ? AND idGimnasio = ?", 
            [dni, idGimnasio], 
            callback
        );
    }

    getPlanActivo = (idSocio, callback) => {
        db.query(
            `SELECT * FROM socio_plan 
             WHERE idSocio = ? 
             AND fechaInicio <= CURDATE() 
             AND fechaFin >= CURDATE()`,
            [idSocio],
            callback
        );
    }


    createIngreso = (ingreso, callback) => {
        db.query(
            `INSERT INTO ingreso 
            (idGimnasio, idSocio, fechaIngreso, horaIngreso, esValido) 
             VALUES (?, ?, ?, ?, ?)`,
            [
                ingreso.idGimnasio,
                ingreso.idSocio,
                ingreso.fechaIngreso,
                ingreso.horaIngreso,
                ingreso.esValido
            ],
            callback
        );
    }

    updateIngreso = (ingreso, callback) => {
        db.query(
            `UPDATE ingreso 
             SET idGimnasio = ?, idSocio = ?, fechaIngreso = ?, horaIngreso = ?, esValido = ?
             WHERE idIngreso = ?`,
            [
                ingreso.idGimnasio,
                ingreso.idSocio,
                ingreso.fechaIngreso,
                ingreso.horaIngreso,
                ingreso.esValido,
                ingreso.id
            ],
            callback
        );
    }

    deleteIngreso = (id, callback) => {
        db.query(
            'DELETE FROM ingreso WHERE idIngreso = ?',
            [id],
            callback
        );
    }
}

module.exports = new IngresoModel();