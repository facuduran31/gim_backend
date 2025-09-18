const db = require('./db.js');

class HistoricoPreciosModel {
    getAll = (callback) => {
        db.query('SELECT * FROM historico_precios', callback);
    }

    getById = (id, callback) => {
        db.query('SELECT * FROM historico_precios WHERE idHistoricoPrecios = ?', [id], callback);
    }

    create = (registro, callback) => {
        db.query(
            'INSERT INTO historico_precios (idHistoricoPrecios, idPlan, precio, fechaDesde, fechaHasta) VALUES (?, ?, ?, ?, ?)',
            [registro.idHistoricoPrecios, registro.idPlan, registro.precio, registro.fechaDesde, registro.fechaHasta],
            callback
        );
    }

    update = (registro, callback) => {
        db.query(
            'UPDATE historico_precios SET idPlan = ?, precio = ?, fechaDesde = ?, fechaHasta = ? WHERE idHistoricoPrecios = ?',
            [registro.idPlan, registro.precio, registro.fechaDesde, registro.fechaHasta, registro.id],
            callback
        );
    }

    delete = (id, callback) => {
        db.query('DELETE FROM historico_precios WHERE idHistoricoPrecios = ?', [id], callback);
    }
}

module.exports = new HistoricoPreciosModel();
