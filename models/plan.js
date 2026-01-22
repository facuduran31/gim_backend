const db = require('./db.js');

class planModel {
  getAllPlanes = (callback) => {
    db.query('SELECT * FROM plan WHERE deletedAt IS NULL', callback);
  };

  getPlanById = (id, callback) => {
    db.query('SELECT * FROM plan WHERE idPlan = ? AND deletedAt IS NULL', [id], callback);
  };

  getPlanesByGimnasio = (idGimnasio, callback) => {
    db.query(
      'SELECT * FROM plan WHERE idGimnasio = ? AND deletedAt IS NULL',
      [idGimnasio],
      callback
    );
  };

  getPlanActualByIdSocio = (idSocio, callback) => {
    const sql = `
            SELECT 
                s.idSocio,
                s.nombre,
                s.apellido,
                p.idPlan,
                p.nombre AS nombrePlan,
                p.descripcion,
                p.duracion,
                p.diasPorSemana,
                sp.fechaInicio,
                sp.fechaFin
            FROM socio s
            INNER JOIN socio_plan sp ON s.idSocio = sp.idSocio
            INNER JOIN plan p ON sp.idPlan = p.idPlan AND p.deletedAt IS NULL
            WHERE s.idSocio = ?
              AND p.idGimnasio = s.idGimnasio
              AND CURDATE() BETWEEN sp.fechaInicio AND sp.fechaFin
            ORDER BY sp.fechaInicio DESC
            LIMIT 1;
        `;

    db.query(sql, [idSocio], callback);
  };

  getPlanByName = (nombre, callback) => {
    db.query('SELECT * FROM plan WHERE nombre=? AND deletedAt IS NULL', [nombre], callback);
  };

  createPlan = (plan, callback) => {
    db.query(
      'INSERT INTO plan (nombre, descripcion, duracion, diasPorSemana, idGimnasio) VALUES (?, ?, ?, ?, ?)',
      [plan.nombre, plan.descripcion, plan.duracion, plan.diasPorSemana, plan.idGimnasio],
      callback
    );
  };

  updatePlan = (plan, callback) => {
    db.query(
      'UPDATE plan SET nombre = ?, descripcion = ?, duracion = ?, diasPorSemana = ?, idGimnasio = ? WHERE idPlan = ?',
      [plan.nombre, plan.descripcion, plan.duracion, plan.diasPorSemana, plan.idGimnasio, plan.id],
      callback
    );
  };

  deletePlan = (id, callback) => {
    db.query('UPDATE plan SET deletedAt=NOW() WHERE idPlan = ?', [id], callback);
  };
}

module.exports = new planModel();
