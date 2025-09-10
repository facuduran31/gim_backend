const db = require('./db.js');

class SocioModel {
    getAllSocios = (callback) => {
        db.query('SELECT * FROM socio', callback);
    }

    getSocioById = (id, callback) => {
        db.query('SELECT * FROM socio WHERE idSocio = ?', [id], callback);
    }

    getSocioByDni = (dni, callback) => {
        db.query('SELECT * FROM socio WHERE dni = ?', [dni], callback);
    }

    getSociosByGimnasio = (idGimnasio, callback) => {
        db.query("select distinct s.idSocio, s.nombre, s.apellido, s.dni, s.telefono, s.activo FROM gimnasio g INNER JOIN plan p ON g.idGimnasio=p.idGimnasio INNER JOIN socio_plan sp ON p.idPlan=sp.idPlan INNER JOIN socio s ON sp.idSocio=s.idSocio where g.idGimnasio=?;", [idGimnasio], callback);
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

    validarIngreso = (dni, callback) => {
        db.query('SELECT * FROM socio s INNER JOIN socio_plan sp ON s.idSocio = sp.idSocio INNER JOIN plan p ON p.idPlan = sp.idPlan INNER JOIN gimnasio g ON g.idGimnasio = p.idGimnasio WHERE s.dni = ?;', [dni], callback)
    }
}

module.exports = new SocioModel();