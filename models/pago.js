const db = require('./db.js');

function toMySqlDateTime(value) {
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return null;

  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

class PagoModel {
  getAll(callback) {
    db.query(
      `SELECT idPago, idSocioPlan, idMetodoPago, monto, fechaPago
       FROM pago
       WHERE deletedAt IS NULL
       ORDER BY fechaPago DESC`,
      callback
    );
  }

  getById(id, callback) {
    db.query(
      `SELECT idPago, idSocioPlan, idMetodoPago, monto, fechaPago
       FROM pago
       WHERE idPago = ? AND deletedAt IS NULL`,
      [id],
      callback
    );
  }

  getBySocioPlan(idSocioPlan, callback) {
    db.query(
      `
      SELECT 
        p.idPago,
        p.idSocioPlan,
        p.idMetodoPago,
        mp.nombre AS metodoPago,
        p.monto,
        p.fechaPago,

        sp.idSocio,
        sp.idPlan,
        sp.fechaInicio,
        sp.fechaFin,

        pl.nombre AS nombrePlan
      FROM pago p
      INNER JOIN metodo_pago mp ON mp.idMetodoPago = p.idMetodoPago
      INNER JOIN socio_plan sp ON sp.idSocioPlan = p.idSocioPlan
      INNER JOIN plan pl ON pl.idPlan = sp.idPlan
      WHERE p.idSocioPlan = ?
        AND p.deletedAt IS NULL
        AND sp.deletedAt IS NULL
        AND pl.deletedAt IS NULL
      ORDER BY p.fechaPago DESC
      `,
      [idSocioPlan],
      callback
    );
  }

  getBySocio(idSocio, callback) {
    db.query(
      `
      SELECT
        p.idPago,
        p.idSocioPlan,
        p.idMetodoPago,
        mp.nombre AS metodoPago,
        p.monto,
        p.fechaPago,
        sp.idSocio,
        sp.idPlan,
        sp.fechaInicio,
        sp.fechaFin,
        pl.nombre AS nombrePlan
      FROM pago p
      INNER JOIN socio_plan sp ON sp.idSocioPlan = p.idSocioPlan
      INNER JOIN plan pl ON pl.idPlan = sp.idPlan
      INNER JOIN metodo_pago mp ON mp.idMetodoPago = p.idMetodoPago
      WHERE sp.idSocio = ?
        AND p.deletedAt IS NULL
        AND sp.deletedAt IS NULL
        AND pl.deletedAt IS NULL
      ORDER BY p.fechaPago DESC
      `,
      [idSocio],
      callback
    );
  }

  create(pago, callback) {
    const fecha = toMySqlDateTime(pago.fechaPago);
    if (!fecha) return callback({ code: 'ER_WRONG_VALUE', sqlMessage: 'fechaPago inválida' });

    db.query(
      `INSERT INTO pago (idSocioPlan, idMetodoPago, monto, fechaPago)
       VALUES (?, ?, ?, ?)`,
      [pago.idSocioPlan, pago.idMetodoPago, pago.monto, fecha],
      callback
    );
  }

  delete(id, callback) {
    db.query(`UPDATE pago SET deletedAt = NOW() WHERE idPago = ?`, [id], callback);
  }
}

module.exports = new PagoModel();
