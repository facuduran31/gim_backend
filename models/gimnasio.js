const db = require('./db.js');

class gimnasioModel {
  getAllGimnasios = (callback) => {
    db.query('SELECT * FROM gimnasio', callback);
  };

  getGimnasioById = (id, callback) => {
    db.query('SELECT * FROM gimnasio WHERE idGimnasio = ?', [id], callback);
  };

  getGimnasioByUser = (idUsuario, callback) => {
    db.query('SELECT * FROM gimnasio WHERE idUsuario = ?', [idUsuario], callback);
  };

  createGimnasio = (gimnasio, callback) => {
    db.query(
      'INSERT INTO gimnasio (nombre, logo, idUsuario) VALUES (?, ?, ?)',
      [gimnasio.nombre, gimnasio.logo, gimnasio.idUsuario],
      callback
    );
  };

  updateGimnasio = (gimnasio, callback) => {
    db.query(
      'UPDATE gimnasio SET nombre = ?, logo = ?, idUsuario= ? WHERE idGimnasio = ?',
      [gimnasio.nombre, gimnasio.logo, gimnasio.idUsuario, gimnasio.id],
      callback
    );
  };

  deleteGimnasio = (id, callback) => {
    db.query('DELETE FROM gimnasio WHERE idGimnasio = ?', [id], callback);
  };
}

module.exports = new gimnasioModel();
