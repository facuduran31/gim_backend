const db = require('./db.js');


class MetodoPagoModel {

  getAllMetodosPago = (callback) => {
    db.query('SELECT * FROM metodo_pago;', callback)
  }

  getMetodoPagoById = (idMetodoPago, callback) => {
    db.query('SELECT * FROM metodo_pago where idMetodoPago=?', [idMetodoPago], callback)
  }

  createMetodoPago = (metodoPago, callback) => {
    db.query('INSERT INTO metodo_pago (nombre, descripcion) values (?, ?);', [metodoPago.nombre, metodoPago.descripcion], callback)
  }

  updateMetodoPago = (metodoPago, callback) => {
    db.query('UPDATE metodo_pago SET nombre=?, descripcion=? WHERE idMetodoPago=?;', [metodoPago.nombre, metodoPago.descripcion, metodoPago.id], callback)
  }

  deleteMetodoPago = (idMetodoPago, callback) => {
    db.query('DELETE FROM metodo_pago WHERE idMetodoPago=?', [idMetodoPago], callback)
  }
}


module.exports = new MetodoPagoModel();