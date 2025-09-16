const db = require('./db.js');


class PagoModel {

  getAllPagos = (callback) => {
    db.query('SELECT * FROM pago;', callback)
  }

  getPagoById = (idPago, callback) => {
    db.query('SELECT * FROM pago where idPago=?', [idPago], callback)
  }

  createPago = (pago, callback) => {
    db.query('INSERT INTO pago (idSocioPlan, idMetodoPago, monto, fechaPago) values (?, ?, ?, ?);', [pago.idSocioPlan, pago.idMetodoPago, pago.monto, pago.fechaPago], callback)
  }

  updatePago = (pago, callback) => {
    db.query('UPDATE pago SET idSocioPlan=?, idMetodoPago=?, monto=?, fechaPago=? WHERE idPago=?;', [pago.idSocioPlan, pago.idMetodoPago, pago.monto, pago.fechaPago, pago.id], callback)
  }

  deletePago = (idPago, callback) => {
    db.query('DELETE FROM pago WHERE idPago=?', [idPago], callback)
  }
}


module.exports = new PagoModel();