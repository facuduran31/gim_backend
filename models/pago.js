const db = require('./db.js');

class PagoModel {
  getAll = (callback) => {
    db.query('SELECT * FROM pago WHERE deletedAt IS NULL', callback);
  };

  getById = (id, callback) => {
    db.query('SELECT * FROM pago WHERE idPago = ? AND deletedAt IS NULL', [id], callback);
  };

  getBySocioPlan = (idSocioPlan, callback) => {
    db.query(
      `
            SELECT 
                p.idPago,
                p.idSocioPlan,
                p.idMetodoPago,
                mp.nombre AS metodoPago,
                p.monto,
                p.fechaPago
            FROM pago p
            INNER JOIN metodo_pago mp 
                ON mp.idMetodoPago = p.idMetodoPago
            WHERE p.idSocioPlan = ?
            AND p.deletedAt IS NULL
            ORDER BY p.fechaPago DESC
        `,
      [idSocioPlan],
      callback
    );
  };

  create = (pago, callback) => {
    db.query(
      `INSERT INTO pago 
             (idSocioPlan, idMetodoPago, monto, fechaPago)
             VALUES (?, ?, ?, ?)`,
      [pago.idSocioPlan, pago.idMetodoPago, pago.monto, pago.fechaPago],
      callback
    );
  };

  update = (pago, callback) => {
    db.query(
      `UPDATE pago 
             SET idSocioPlan = ?, idMetodoPago = ?, monto = ?, fechaPago = ?
             WHERE idPago = ?`,
      [pago.idSocioPlan, pago.idMetodoPago, pago.monto, pago.fechaPago, pago.id],
      callback
    );
  };

  delete = (id, callback) => {
    db.query('UPDATE pago SET deletedAt=NOW() WHERE idPago = ?', [id], callback);
  };
}

module.exports = new PagoModel();
