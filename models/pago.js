const db = require('./db.js');

class PagoModel {
    getAll = (callback) => {
        db.query('SELECT * FROM pago', callback);
    }

    getById = (id, callback) => {
        db.query('SELECT * FROM pago WHERE idPago = ?', [id], callback);
    }

    create = (pago, callback) => {
        db.query(
            'INSERT INTO pago (idPago, idSocioPlan, idMetodoPago, monto, fechaPago) VALUES (?, ?, ?, ?, ?)',
            [pago.idPago, pago.idSocioPlan, pago.idMetodoPago, pago.monto, pago.fechaPago],
            callback
        );
    }

    update = (pago, callback) => {
        db.query(
            'UPDATE pago SET idSocioPlan = ?, idMetodoPago = ?, monto = ?, fechaPago = ? WHERE idPago = ?',
            [pago.idSocioPlan, pago.idMetodoPago, pago.monto, pago.fechaPago, pago.id],
            callback
        );
    }

    delete = (id, callback) => {
        db.query('DELETE FROM pago WHERE idPago = ?', [id], callback);
    }
}

module.exports = new PagoModel();
