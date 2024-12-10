const db = require('./db.js');

class SocioModel{
    getAllSocios = (callback) => {
        db.query('SELECT * FROM socio', callback);
    }

    createSocio = (socio, callback) => {
        db.query('INSERT INTO socio (nombre, apellido, dni, telefono, activo) VALUES (?, ?, ?, ?, ?)', [socio.nombre, socio.apellido, socio.dni, socio.telefono, socio.activo], callback);
    }

    updateSocio = (socio, callback) => {
        db.query('UPDATE socio SET nombre = ?, apellido = ?, dni = ?, telefono = ?, activo = ? WHERE idSocio = ?', [socio.nombre, socio.apellido, socio.dni, socio.telefono, socio.activo, socio.id], callback);
    }

    deleteSocio = (id, callback) => {
        db.query('DELETE FROM socio WHERE idSocio = ?', [id], callback);
    }
}

module.exports = new SocioModel();