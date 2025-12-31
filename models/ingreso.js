const db = require('./db.js');

class ingresoModel {
    getAllIngresos = (callback) => {
        db.query('SELECT * FROM ingreso', callback);
    }

    getIngresosByIdGimnasio = (id, callback) => {
        db.query('SELECT * FROM ingreso WHERE idGimnasio = ? ORDER BY fechaIngreso ASC', [id], callback);
    }

    createIngreso = (ingreso, callback) => {
        db.query('INSERT INTO ingreso (idGimnasio, idSocio, fechaIngreso, horaIngreso, esValido) VALUES (?, ?, ?, ?, ?)', [ingreso.idGimnasio, ingreso.idSocio, ingreso.fechaIngreso, ingreso.horaIngreso, ingreso.esValido], callback);
    }

    updateingreso = (ingreso, callback) => {
        db.query('UPDATE ingreso SET idGimnasio = ?, idSocio = ?, fechaIngreso = ?, horaIngreso = ?, esValido = ? WHERE idIngreso = ?', [ingreso.idGimnasio, ingreso.idSocio, ingreso.fechaIngreso, ingreso.horaIngreso, ingreso.esValido, ingreso.id], callback);
    }

    deleteingreso = (id, callback) => {
        db.query('DELETE FROM ingreso WHERE idIngreso = ?', [id], callback);
    }
}

module.exports = new ingresoModel();