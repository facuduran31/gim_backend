const db = require('./db.js');

class gimnasioModel{
    getAllGimnasios = (callback) => {
        db.query('SELECT * FROM gimnasio', callback);
    }

    createGimnasio = (gimnasio, callback) => {
        console.log(gimnasio);
        db.query('INSERT INTO gimnasio (nombre, logo) VALUES (?, ?)', [gimnasio.nombre, gimnasio.logo], callback);
    }

    updateGimnasio = (gimnasio, callback) => {
        db.query('UPDATE gimnasio SET nombre = ?, logo = ? WHERE idGimnasio = ?', [gimnasio.nombre, gimnasio.logo, gimnasio.id], callback);
    }

    deleteGimnasio = (id, callback) => {
        db.query('DELETE FROM gimnasio WHERE idGimnasio = ?', [id], callback);
    }
}

module.exports = new gimnasioModel();
