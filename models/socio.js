const db = require('./db');

class SocioModel {
  getAllSocios(callback) {
    db.query('SELECT * FROM socio WHERE deletedAt IS NULL;', callback);
  }

  getSocioById(idSocio, callback) {
    db.query('SELECT * FROM socio WHERE idSocio = ? AND deletedAt IS NULL;', [idSocio], callback);
  }

  getSocioByDni(dni, callback) {
    db.query('SELECT * FROM socio WHERE dni = ? AND deletedAt IS NULL;', [dni], callback);
  }

  getSociosByGimnasio(idGimnasio, callback) {
    db.query(
      'SELECT * FROM socio WHERE idGimnasio = ? AND deletedAt IS NULL;',
      [idGimnasio],
      callback
    );
  }

  getSociosByGimnasioConPlanActual = (idGimnasio, callback) => {
    const sql = `
      SELECT
        s.idSocio,
        s.dni,
        s.nombre,
        s.apellido,
        s.telefono,
        s.activo,
        s.idGimnasio,

        sp.idSocioPlan,
        sp.fechaInicio,
        sp.fechaFin,

        pl.idPlan,
        pl.nombre AS nombrePlan,
        pl.descripcion,
        pl.duracion,
        pl.diasPorSemana,

        (
          SELECT hp.precio
          FROM historico_precios hp
          WHERE hp.idPlan = pl.idPlan
            AND hp.deletedAt IS NULL
            AND hp.fechaDesde <= CURDATE()
            AND (hp.fechaHasta IS NULL OR CURDATE() <= hp.fechaHasta)
          ORDER BY hp.fechaDesde DESC
          LIMIT 1
        ) AS precioPlan

      FROM socio s
      LEFT JOIN socio_plan sp
        ON sp.idSocio = s.idSocio
        AND sp.deletedAt IS NULL
        AND CURDATE() BETWEEN sp.fechaInicio AND sp.fechaFin

      LEFT JOIN plan pl
        ON pl.idPlan = sp.idPlan
        AND pl.deletedAt IS NULL

      WHERE s.idGimnasio = ?
        AND s.deletedAt IS NULL
    `;

    db.query(sql, [idGimnasio], callback);
  };

  getByGimnasio = (idGimnasio, { from, to }, callback) => {
    let sql = `
    SELECT
      p.idPago,
      p.idSocioPlan,
      p.idMetodoPago,
      mp.nombre AS metodoPago,
      p.monto,
      p.fechaPago,
      s.idSocio,
      s.nombre,
      s.apellido,
      s.dni
    FROM pago p
    INNER JOIN socio_plan sp ON sp.idSocioPlan = p.idSocioPlan
    INNER JOIN socio s ON s.idSocio = sp.idSocio
    INNER JOIN metodo_pago mp ON mp.idMetodoPago = p.idMetodoPago
    WHERE s.idGimnasio = ?
      AND p.deletedAt IS NULL
  `;

    const params = [idGimnasio];

    if (from) {
      sql += ` AND p.fechaPago >= ?`;
      params.push(from);
    }
    if (to) {
      sql += ` AND p.fechaPago <= ?`;
      params.push(to);
    }

    sql += ` ORDER BY p.fechaPago DESC`;

    db.query(sql, params, callback);
  };

  createSocio(socio, callback) {
    const { dni, nombre, apellido, telefono, activo, idGimnasio } = socio;
    db.query(
      'INSERT INTO socio (dni, nombre, apellido, telefono, activo, idGimnasio) VALUES (?, ?, ?, ?, ?, ?);',
      [dni, nombre, apellido, telefono, activo, idGimnasio],
      callback
    );
  }

  updateSocio(socio, callback) {
    const { idSocio, dni, nombre, apellido, telefono, activo, idGimnasio } = socio;
    db.query(
      'UPDATE socio SET dni=?, nombre=?, apellido=?, telefono=?, activo=?, idGimnasio=? WHERE idSocio=?;',
      [dni, nombre, apellido, telefono, activo, idGimnasio, idSocio],
      callback
    );
  }

  deleteSocio(idSocio, callback) {
    db.query('UPDATE socio SET deletedAt=NOW() WHERE idSocio = ?', [idSocio], callback);
  }

  validarIngreso(dni, callback) {
    db.query('SELECT * FROM socio WHERE dni=? AND deletedAt IS NULL;', [dni], callback);
  }

  getUltimoPlan(idSocio, callback) {
    db.query(
      'SELECT * FROM socio_plan WHERE idSocio=? ORDER BY fechaFin DESC LIMIT 1 AND deletedAt IS NULL;',
      [idSocio],
      callback
    );
  }

  createSocioPlan(socioPlan, callback) {
    const { idSocio, idPlan, fechaInicio, fechaFin } = socioPlan;
    db.query(
      'INSERT INTO socio_plan (idSocio, idPlan, fechaInicio, fechaFin) VALUES (?, ?, ?, ?);',
      [idSocio, idPlan, fechaInicio, fechaFin],
      callback
    );
  }

  updateSocioPlan(socioPlan, callback) {
    const { idSocioPlan, idPlan, fechaInicio, fechaFin } = socioPlan;
    db.query(
      'UPDATE socio_plan SET idPlan=?, fechaInicio=?, fechaFin=? WHERE idSocioPlan=?;',
      [idPlan, fechaInicio, fechaFin, idSocioPlan],
      callback
    );
  }
}

module.exports = new SocioModel();
