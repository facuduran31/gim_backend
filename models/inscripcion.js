const db = require('./db');

class inscripcionModel {
  getAllInscripciones = (callback) => {
    db.query('SELECT * FROM socio_plan WHERE deletedAt IS NULL;', callback);
  };

  getInscripcionById = (idSocioPlan, callback) => {
    db.query(
      'SELECT * FROM socio_plan WHERE idSocioPlan = ? AND deletedAt IS NULL;',
      [idSocioPlan],
      callback
    );
  };

  getInscripcionesByIdGimnasio(idGimnasio, callback) {
    db.query(
      'SELECT * FROM gimnasio g INNER JOIN plan p on g.idGimnasio=p.idGimnasio INNER JOIN socio_plan sp on p.idPlan=sp.idPlan WHERE g.idGimnasio=? AND sp.deletedAt IS NULL;',
      [idGimnasio],
      callback
    );
  }

  getInscripcionActual(idSocio, callback) {
    db.query(
      `
    SELECT 
        sp.*,
        p.nombre AS nombrePlan
    FROM 
        socio_plan sp
    INNER JOIN 
        plan p ON sp.idPlan = p.idPlan
    WHERE 
        sp.idSocio = ?
        AND sp.deletedAt IS NULL
    ORDER BY 
        sp.fechaFin DESC;
`,
      [idSocio],
      callback
    );
  }

  createInscripcion = (inscripcion, callback) => {
    db.query(
      'INSERT INTO socio_plan (idSocio, idPlan, fechaInicio, fechaFin) VALUES (?, ?, ?, ?);',
      [inscripcion.idSocio, inscripcion.idPlan, inscripcion.fechaInicio, inscripcion.fechaFin],
      callback
    );
  };

  updateInscripcion = (inscripcion, callback) => {
    db.query(
      'UPDATE socio_plan SET fechaInicio = ?, fechaFin = ? WHERE idSocioPlan = ?;',
      [inscripcion.fechaInicio, inscripcion.fechaFin, inscripcion.idSocioPlan],
      callback
    );
  };

  deleteInscripcion = (idSocioPlan, callback) => {
    db.query(
      'UPDATE socio_plan SET deletedAt=NOW() WHERE idSocioPlan = ?',
      [idSocioPlan],
      callback
    );
  };

  planActivo = (idSocio, callback) => {
    db.query(
      'SELECT * FROM socio_plan WHERE idSocio=? and fechaFin>CURDATE() AND deletedAt IS NULL;',
      [idSocio],
      callback
    );
  };
}

module.exports = new inscripcionModel();
