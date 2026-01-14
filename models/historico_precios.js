const db = require('./db.js');

class historicoPreciosModel {
    // Crear un nuevo registro en el histórico
    createHistoricoPrecio = (registro, callback) => {
        db.query(
            `INSERT INTO historico_precios (idPlan, precio, fechaDesde) 
             VALUES (?, ?, CURDATE())`,
            [registro.idPlan, registro.precio],
            callback
        );
    }

    // Cerrar el precio actual (cuando cambia el precio de un plan)
    cerrarHistoricoPrecio = (idPlan, callback) => {
        db.query(
            `UPDATE historico_precios 
             SET fechaHasta = CURDATE() 
             WHERE idPlan = ? AND fechaHasta IS NULL`,
            [idPlan],
            callback
        );
    }

    // Obtener el histórico completo de un plan
    getHistoricoByPlan = (idPlan, callback) => {
        db.query(
            `SELECT * FROM historico_precios WHERE idPlan = ? AND deletedAt IS NULL ORDER BY fechaDesde DESC`,
            [idPlan],
            callback
        );
    }

    // Obtener el ultimo histórico de un plan
    getUltimoHistoricoByPlan = (idPlan, callback) => {
        db.query(
            `SELECT * FROM historico_precios WHERE idPlan = ? AND deletedAt IS NULL ORDER BY fechaDesde DESC LIMIT 1`,
            [idPlan],
            callback
        );
    }
}

module.exports = new historicoPreciosModel();
