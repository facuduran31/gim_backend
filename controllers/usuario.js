const UsuarioModel = require('../models/usuario.js');
const { generateToken } = require('../middlewares/token.js');
const { usuarioSchema, loginschema } = require('../interfaces/usuario.js');
const bcrypt = require('bcrypt');

class UsuarioController {
    getAllUsuarios = (req, res) => {
        try {
            UsuarioModel.getAllUsuarios((err, data) => {
                if (err) {
                    throw new Error('Error al obtener los usuarios');
                } else {
                    res.status(200).json(data);
                }
            });     
        } catch (error) {
            res.status(500).json({ error: error.message });            
        }

    }

    getUsuarioById = (req, res) => {
        const id = req.params.id;
        try {
            UsuarioModel.getUsuarioById(id, (err, data) => {
                if (err) {
                    throw new Error('Error al obtener el usuario');
                } else {
                    res.ststus(200).json(data);
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });            
        }
        
    }

    createUsuario = async (req, res) => {
        const usuario = req.body;
        try {
            const usuarioValido = usuarioSchema.safeParse(usuario);
            if (usuarioValido.success) {
                const duplicado = await this.getUserByMail(usuario.mail);
                if (!duplicado) {
                    const contraEncriptada= await bcrypt.hash(usuario.password, 10); //Encripto la contraseña
                    const usuarioEncriptado = {...usuario, password: contraEncriptada}; //Creo un nuevo objeto con la contraseña encriptada
                    UsuarioModel.createUsuario(usuarioEncriptado, (err, data) => {
                        if (err) {
                            throw new Error('Error al crear el usuario');
                        } else {
                            res.json({ message: 'Usuario creado correctamente' });
                        }
                    });
                } else {
                    throw new Error('El mail ya se encuentra registrado');
                }
    
            } else {
                throw new Error(usuarioValido.error.errors[0].message);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
       

    }

    updateUsuario = async (req, res) => {
        const usuario = req.body;
        try {
            usuario.id = parseInt(req.params.id);
            const usuarioValido = usuarioSchema.safeParse(usuario);
            if (usuarioValido.success) {
                const contraEncriptada= await bcrypt.hash(usuario.password, 10); //Encripto la contraseña
                const usuarioEncriptado = {...usuario, password: contraEncriptada}; //Creo un nuevo objeto con la contraseña encriptada
                UsuarioModel.updateUsuario(usuarioEncriptado, (err, data) => {
                    if (err) {
                        throw new Error('Error al actualizar el usuario');
                    } else {
                        res.json({ message: 'Usuario actualizado correctamente' });
                    }
                });
            } else {
                throw new Error(usuarioValido.error.errors[0].message);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });            
        }
       

    }

    deleteUsuario = (req, res) => {
        const id = req.params.id;
        try {
            UsuarioModel.deleteUsuario(id, (err, data) => {
                if (err) {
                    throw new Error('Error al eliminar el usuario');
                } else {
                    res.json({ message: 'Usuario eliminado correctamente' });
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });            
        }
        
    }

    login=(req, res)=> {
        const mail = req.body.mail;
        const password = req.body.password;
        const loginValido = loginschema.safeParse({ mail, password });
        try{
            if (loginValido.success) {
            
                UsuarioModel.getUserByMail(mail, (err, data) => {
                    if (err) {
                        res.status(500).json({ error: 'Error al iniciar sesión' });
                    } else {
    
                        if (data.length > 0) {
                            try{
                                const isValid = bcrypt.compareSync(password, data[0].password);
                                if (!isValid) {throw new Error('Contraseña incorrecta');}
                            }
                            catch(err){
                                res.status(400).json({ error: 'Contraseña incorrecta' });
                                return;
                            }
                            
                            const payload = data[0];
                            const token = generateToken(payload);
                            const user = {id: payload.idUsuario, mail: payload.mail, nombre: payload.nombre, apellido: payload.apellido};
                            req.session.user = user;
                            req.session.save();
    
                            res
                                .cookie('authToken', token, {
                                    httpOnly: true,
                                    secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
                                    sameSite: 'strict',
                                    maxAge: 1000 * 60 * 60 * 24 // 24 horas
                                })
                                .cookie('user', JSON.stringify(user), {
                                    httpOnly: false,
                                    secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
                                    sameSite: 'strict',
                                    maxAge: 1000 * 60 * 60 * 24 // 24 horas
                                })
                                .send({ message: 'Sesión iniciada correctamente' });
                        } else {
                            res.status(404).send({ error: 'Usuario no encontrado' });
                        }
    
                    }
                });
            } else {
                throw new Error(loginValido.error.errors[0].message);
            }
        }
        catch(err){
            res.status(400).json({ error: err.message });
        }
    }



    logout=(req, res) => { //Termino la sesion y borro las cookies
    
        req.logout(function(err) {
          if (err) { return next(err); }
          req.session.destroy();
          res
            .clearCookie('authToken',{path: '/', domain:'localhost', httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production'})
            .clearCookie('user',{path: '/', domain:'localhost', httpOnly: false, sameSite: 'strict', secure: process.env.NODE_ENV === 'production'})
            .clearCookie('connect.sid',{path: '/', domain:'localhost', httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production'})
            .send({ message: 'Sesión cerrada correctamente' });
        });
       
      };
    





      getUserByMail = async (mail) => {
        return new Promise((resolve, reject) => {
            UsuarioModel.getUserByMail(mail, (err, data) => {
                if (err) {
                    reject('Error al buscar el mail');
                } else {
                    resolve(data.length > 0);
                }
            });
        });
    }




    

}

module.exports = new UsuarioController();