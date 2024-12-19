const UsuarioModel = require('../models/usuario.js');
const { generateToken } = require('../middlewares/token.js');
const { usuarioSchema, loginschema } = require('../interfaces/usuario.js');

class UsuarioController {
    getAllUsuarios = (req, res) => {
        UsuarioModel.getAllUsuarios((err, data) => {
            if (err) {
                res.status(500).json({ error: 'Error al obtener los usuarios' });
            } else {
                res.json(data);
            }
        });
    }

    getUsuarioById = (req, res) => {
        const id = req.params.id;
        UsuarioModel.getUsuarioById(id, (err, data) => {
            if (err) {
                res.status(500).json({ error: 'Error al obtener el usuario' });
            } else {
                res.json(data);
            }
        });
    }

    createUsuario = (req, res) => {
        const usuario = req.body;
        const usuarioValido = usuarioSchema.safeParse(usuario);
        if (usuarioValido.success) {
            UsuarioModel.createUsuario(usuario, (err, data) => {
                if (err) {
                    res.status(500).json({ error: 'Error al crear el usuario' });
                } else {
                    res.json({ message: 'Usuario creado correctamente' });
                }
            });
        } else {
            res.status(400).json({ error: usuarioValido.error.errors[0].message });
        }

    }

    updateUsuario = (req, res) => {
        const usuario = req.body;
        usuario.id = parseInt(req.params.id);
        const usuarioValido = usuarioSchema.safeParse(usuario);
        if (usuarioValido.success) {
            UsuarioModel.updateUsuario(usuario, (err, data) => {
                if (err) {
                    res.status(500).json({ error: 'Error al actualizar el usuario' });
                    console.log(err);
                } else {
                    res.json({ message: 'Usuario actualizado correctamente' });
                }
            });
        } else {
            res.status(400).json({ error: usuarioValido.error.errors[0].message });
        }

    }

    deleteUsuario = (req, res) => {
        const id = req.params.id;
        UsuarioModel.deleteUsuario(id, (err, data) => {
            if (err) {
                res.status(500).json({ error: 'Error al eliminar el usuario' });
            } else {
                res.json({ message: 'Usuario eliminado correctamente' });
            }
        });
    }

    login(req, res) {
        const mail = req.body.mail;
        const password = req.body.password;
        const loginValido = loginschema.safeParse({ mail, password });
        if (loginValido.success) {
            UsuarioModel.login(mail, password, (err, data) => {
                if (err) {
                    res.status(500).json({ error: 'Error al iniciar sesión' });
                } else {

                    if (data.length > 0) {
                        const payload = data[0];
                        const token = generateToken(payload);
                        res.json({ token, user: data[0] });
                    } else {
                        res.status(404).send({ error: 'Usuario no encontrado' });
                    }

                }
            });
        } else {
            res.status(400).json({ error: loginValido.error.errors[0].message });
        }
    }


}

module.exports = new UsuarioController();