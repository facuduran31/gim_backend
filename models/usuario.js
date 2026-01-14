const db = require('./db.js');


class UsuarioModel {
    getAllUsuarios = (callback) => {
        db.query('SELECT * FROM usuario where deletedAt IS NULL', callback);
    }

    getUsuarioById = (id, callback) => {
        db.query('SELECT * FROM usuario WHERE idUsuario = ? AND deletedAt IS NULL', [id], callback);
    }

    createUsuario = (usuario, callback) => {
        db.query('INSERT INTO usuario (nombre, apellido, mail, password) VALUES (?, ?, ?, ?)', [usuario.nombre, usuario.apellido, usuario.mail, usuario.password], callback);
    }

    updateUsuario = (usuario, callback) => {
        db.query('UPDATE usuario SET nombre = ?, apellido = ?, mail = ? WHERE idUsuario = ?', [usuario.nombre, usuario.apellido, usuario.mail, usuario.id], callback);
    }

    deleteUsuario = (id, callback) => {
        db.query('UPDATE usuario SET deletedAt=NOW() WHERE idUsuario = ?', [id], callback);
    }

    getUserByMail = (mail, callback) => {
        db.query('SELECT * FROM usuario WHERE mail = ? AND deletedAt IS NULL', [mail], callback);
    }

    updatePassword = (mail, password, callback) => {
        db.query('UPDATE usuario SET password = ? WHERE mail = ?', [password, mail], callback);
    }
}

module.exports = new UsuarioModel();