const db = require('./db.js');

class IngresoModel {
    getAllIngresos = (callback) => {
        db.query('SELECT * FROM ingreso WHERE deletedAt IS NULL', callback);
    }

    getIngresosByIdGimnasio = (id, callback) => {
        db.query(
            'SELECT * FROM ingreso WHERE idGimnasio = ? AND deletedAt IS NULL ORDER BY fechaIngreso ASC',
            [id],
            callback
        );
    }

    getSocioByDni = (dni, idGimnasio, callback) => {
        db.query(
            "SELECT * FROM socio WHERE dni = ? AND idGimnasio = ? AND deletedAt IS NULL", 
            [dni, idGimnasio], 
            callback
        );
    }

    getPlanActivo = (idSocio, callback) => {
        db.query(
            `SELECT * FROM socio_plan 
             WHERE idSocio = ? 
             AND fechaInicio <= CURDATE() 
             AND fechaFin >= CURDATE()
             AND deletedAt IS NULL`,
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
        db.query('UPDATE ingreso SET deletedAt=NOW() WHERE idIngreso = ?', [id], callback);
    }
}

module.exports = new IngresoModel();