const db = require('./db.js');

class historicoPreciosModel {
  createHistoricoPrecio = (registro, callback) => {
    db.query(
      `INSERT INTO historico_precios (idPlan, precio, fechaDesde) 
       VALUES (?, ?, CURDATE())`,
      [registro.idPlan, registro.precio],
      callback
    );
  };

  cerrarHistoricoPrecio = (idPlan, callback) => {
    db.query(
      `UPDATE historico_precios 
       SET fechaHasta = CURDATE() 
       WHERE idPlan = ? AND fechaHasta IS NULL`,
      [idPlan],
      callback
    );
  };

  getHistoricoByPlan = (idPlan, callback) => {
    db.query(
      `SELECT * 
       FROM historico_precios 
       WHERE idPlan = ? AND deletedAt IS NULL 
       ORDER BY fechaDesde DESC, idHistoricoPrecios DESC`,
      [idPlan],
      callback
    );
  };

  getUltimoHistoricoByPlan = (idPlan, callback) => {
    db.query(
      `SELECT * 
       FROM historico_precios 
       WHERE idPlan = ? AND deletedAt IS NULL 
       ORDER BY fechaDesde DESC, idHistoricoPrecios DESC 
       LIMIT 1`,
      [idPlan],
      callback
    );
  };
}

module.exports = new historicoPreciosModel();
