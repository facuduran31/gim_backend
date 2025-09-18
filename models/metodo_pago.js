const db = require('./db.js');

class MetodoPagoModel {
    getAll = (callback) => {
        db.query('SELECT * FROM metodo_pago', callback);
    }

    getById = (id, callback) => {
        db.query('SELECT * FROM metodo_pago WHERE idMetodoPago = ?', [id], callback);
    }

    create = (metodo, callback) => {
        db.query(
            'INSERT INTO metodo_pago (idMetodoPago, nombre, descripcion) VALUES (?, ?, ?)',
            [metodo.idMetodoPago, metodo.nombre, metodo.descripcion],
            callback
        );
    }

    update = (metodo, callback) => {
        db.query(
            'UPDATE metodo_pago SET nombre = ?, descripcion = ? WHERE idMetodoPago = ?',
            [metodo.nombre, metodo.descripcion, metodo.id],
            callback
        );
    }

    delete = (id, callback) => {
        db.query('DELETE FROM metodo_pago WHERE idMetodoPago = ?', [id], callback);
    }
}

module.exports = new MetodoPagoModel();
