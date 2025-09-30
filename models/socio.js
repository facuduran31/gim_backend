const db = require('./db.js');

class SocioModel {
    getAllSocios = (callback) => {
        db.query('SELECT * FROM socio;', callback);
    }

    getSocioById = (id, callback) => {
        db.query('SELECT * FROM socio WHERE idSocio = ?', [id], callback);
    }

    getSocioByDni = (dni, callback) => {
        db.query('SELECT * FROM socio WHERE dni = ?;', [dni], callback);
    }

    getSociosByGimnasio = (idGimnasio, callback) => {
        db.query("SELECT * FROM socio WHERE idGimnasio = ?;", [idGimnasio], callback);
    }

    createSocio = (socio, callback) => {
        db.query('INSERT INTO socio (nombre, apellido, dni, telefono, activo, idGimnasio) VALUES (?, ?, ?, ?, ?, ?);', [socio.nombre, socio.apellido, socio.dni, socio.telefono, socio.activo, socio.idGimnasio], callback);
    }

    updateSocio = (socio, callback) => {
        db.query('UPDATE socio SET nombre = ?, apellido = ?, dni = ?, telefono = ?, activo = ?, idGimnasio = ? WHERE idSocio = ?;', [socio.nombre, socio.apellido, socio.dni, socio.telefono, socio.activo, socio.idGimnasio, socio.idSocio], callback);
    }


    deleteSocio = (id, callback) => {
        db.query('DELETE FROM socio WHERE idSocio = ?;', [id], callback);
    }

    validarIngreso = (dni, callback) => {
        db.query('SELECT * FROM socio s INNER JOIN socio_plan sp ON s.idSocio = sp.idSocio INNER JOIN plan p ON p.idPlan = sp.idPlan INNER JOIN gimnasio g ON g.idGimnasio = p.idGimnasio WHERE s.dni = ?;', [dni], callback)
    }
}

module.exports = new SocioModel();