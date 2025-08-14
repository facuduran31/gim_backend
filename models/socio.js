const db = require('./db.js');

class SocioModel{
    getAllSocios = (callback) => {
        db.query('SELECT * FROM socio', callback);
    }

    getSocioById = (id, callback) => {
        db.query('SELECT * FROM socio WHERE idSocio = ?', [id], callback);
    }

    getSociosByGimnasio = (idGimnasio, callback) => {
        db.query("select distinct s.idSocio, s.nombre, s.apellido, s.dni, s.telefono, s.activo from gimnasio g inner join plan p on g.idGimnasio=p.idGimnasio inner join socio_plan sp on p.idPlan=sp.idPlan inner join socio s on sp.idSocio=s.idSocio where g.idGimnasio=?;", [idGimnasio], callback);
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