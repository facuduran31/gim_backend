const db = require('./db.js');


class UsuarioModel {
    getAllUsuarios = (callback) => {
        db.query('SELECT * FROM usuario', callback);
    }

    createUsuario = (usuario, callback) => { //chequear si hace falta agregar el password
        db.query('INSERT INTO usuario (nombre, apellido, mail, password) VALUES (?, ?, ?, ?)', [usuario.nombre, usuario.apellido, usuario.mail, usuario.password], callback);
    }

    updateUsuario = (usuario, callback) => {
        db.query('UPDATE usuario SET nombre = ?, apellido = ?, mail = ?, password= ? WHERE idUsuario = ?', [usuario.nombre, usuario.apellido, usuario.mail, usuario.password, usuario.id], callback);
    }

    deleteUsuario = (id, callback) => {
        db.query('DELETE FROM usuario WHERE idUsuario = ?', [id], callback);
    }

    login = (mail, callback) => {
        db.query('SELECT * FROM usuario WHERE mail = ?', [mail], callback);
    }
}

module.exports = new UsuarioModel();