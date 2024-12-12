const UsuarioModel = require('../models/usuario.js');
const { generateToken } = require('../middlewares/token.js');

class UsuarioController {
    getAllUsuarios = (req, res) => {
        UsuarioModel.getAllUsuarios((err, data) => {
            if (err) {
                res.status(500).json({ message: 'Error al obtener los usuarios' });
            } else {
                res.json(data);
            }
        });
    }

    createUsuario = (req, res) => {
        const usuario = req.body;
        UsuarioModel.createUsuario(usuario, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Error al crear el usuario' });
            } else {
                res.json({ message: 'Usuario creado correctamente' });
            }
        });
    }

    updateUsuario = (req, res) => {
        const usuario = req.body;
        usuario.id = req.params.id;
        UsuarioModel.updateUsuario(usuario, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Error al actualizar el usuario' });
                console.log(err);
            } else {
                res.json({ message: 'Usuario actualizado correctamente' });
            }
        });
    }

    deleteUsuario = (req, res) => {
        const id = req.params.id;
        UsuarioModel.deleteUsuario(id, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Error al eliminar el usuario' });
            } else {
                res.json({ message: 'Usuario eliminado correctamente' });
            }
        });
    }

    login(req, res) {
        const mail = req.body.mail;
        //const password = req.body.password; 
        UsuarioModel.login(mail, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Error al iniciar sesión' });
            } else {

                if (data.length > 0) {
                    const payload = {
                        mail: data[0].mail,
                        //password: pass,
                    };
                    const token = generateToken(payload);
                    res.json({ token, user: data[0] });
                } else {
                    res.status(404).send({ message: 'user not found' });
                }

            }
        });
    }


}

module.exports = new UsuarioController();