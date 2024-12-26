const UsuarioModel = require('../models/usuario.js');
const { generateToken } = require('../middlewares/token.js');
const passport = require('passport');
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

    createUsuario = async (req, res) => {
        const usuario = req.body;
        const usuarioValido = usuarioSchema.safeParse(usuario);
        if (usuarioValido.success) {
            const duplicado = await this.searchDuplicateMail(usuario.mail);
            if (!duplicado) {
                UsuarioModel.createUsuario(usuario, (err, data) => {
                    if (err) {
                        res.status(500).json({ error: 'Error al crear el usuario' });
                    } else {
                        res.json({ message: 'Usuario creado correctamente' });
                    }
                });
            } else {
                res.status(400).json({ error: 'El mail ya está registrado' });
            }

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

    login=(req, res)=> {
        // console.log(req.cookie);
        res.json({ message: 'Login' });
        // const mail = req.body.mail;
        // const password = req.body.password;
        // const loginValido = loginschema.safeParse({ mail, password });
        // if (loginValido.success) {
        //     UsuarioModel.login(mail, password, (err, data) => {
        //         if (err) {
        //             res.status(500).json({ error: 'Error al iniciar sesión' });
        //         } else {

        //             if (data.length > 0) {
        //                 const payload = data[0];
        //                 const token = generateToken(payload);
        //                 res.json({ token, user: data[0] });
        //             } else {
        //                 res.status(404).send({ error: 'Usuario no encontrado' });
        //             }

        //         }
        //     });
        // } else {
        //     res.status(400).json({ error: loginValido.error.errors[0].message });
        // }
    }


    searchDuplicateMail = async (mail) => {
        return new Promise((resolve, reject) => {
            UsuarioModel.searchDuplicateMail(mail, (err, data) => {
                if (err) {
                    reject('Error al buscar el mail');
                } else {
                    resolve(data.length > 0);
                }
            });
        });
    }




    // handleGoogleSignIn=(response)=> {
    //     if (response.error) {
    //         // Handle errors (e.g., user cancellation, network issues)
    //         console.error('Error signing in:', response.error);
    //     } else {
    //         // Access user profile information
    //         const accessToken = response.credential;
    
    //         // Use the access token to retrieve user profile data
    //         fetch('https://www.googleapis.com/userinfo/v2/me', {
    //             headers: {
    //                 Authorization: `Bearer ${accessToken}`
    //             }
    //         })
    //         .then(response => response.json())
    //         .then(data => {
    //             // Extract the desired user profile information (e.g., name, email)
    //             console.log('User profile:', data);
    //             // Use the information as needed (e.g., display on your website, store securely)
    //         })
    //         .catch(error => {
    //             // Handle errors during profile data retrieval
    //             console.error('Error fetching user profile:', error);
    //         });
    //     }
    // }




    

}

module.exports = new UsuarioController();