const db = require('./db.js');


class HistoricoPrecioModel {

  getAllHistoricoPrecio = (callback) => {
    db.query('SELECT * FROM historico_precios;', callback)
  }

  getHistoricoPrecioById = (idHistoricoPrecio, callback) => {
    db.query('SELECT * FROM historico_precios where idHistoricoPrecio=?', [idHistoricoPrecio], callback)
  }

  createHistoricoPrecio = (historicoPrecio, callback) => {
    db.query('INSERT INTO historico_precios (idPlan, precio, fechaDesde, fechaHasta) values (?, ?, ?, ?);', [historicoPrecio.idPlan, historicoPrecio.precio, historicoPrecio.fechaDesde, historicoPrecio.fechaHasta], callback)
  }

  updateHistoricoPrecio = (pago, callback) => {
    db.query('UPDATE historico_precios SET idPlan=?, precio=?, fechaDesde=?, fechaHasta=? WHERE idHistoricoPrecio=?;', [historicoPrecio.idPlan, historicoPrecio.precio, historicoPrecio.fechaDesde, historicoPrecio.fechaHasta, historicoPrecio.id], callback)
  }

  deleteHistoricoPrecio = (idHistoricoPrecio, callback) => {
    db.query('DELETE FROM historico_precios WHERE idHistoricoPrecio=?', [idHistoricoPrecio], callback)
  }
}


module.exports = new HistoricoPrecioModel();