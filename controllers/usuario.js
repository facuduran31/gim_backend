const UsuarioModel = require('../models/usuario.js');
const { generateToken } = require('../middlewares/token.js');
const { usuarioSchema, loginschema } = require('../interfaces/usuario.js');
const bcrypt = require('bcrypt');
const emailMiddleware = require('../middlewares/nodemailer.js');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const mailContacto = process.env.MAIL_CONTACTO;

class UsuarioController {
  getAllUsuarios = (req, res) => {
    try {
      UsuarioModel.getAllUsuarios((err, data) => {
        if (err) {
          res.status(500).json({ error: 'Error al obtener usuarios' });
        } else {
          res.json(data);
        }
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  getUsuarioById = (req, res) => {
    const id = req.params.id;
    try {
      UsuarioModel.getUsuarioById(id, (err, data) => {
        if (err) {
          res.status(500).json({ error: 'Error al obtener usuario' });
        } else {
          res.json(data);
        }
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  createUsuario = (req, res) => {
    const usuario = req.body;
    const usuarioValido = usuarioSchema.safeParse(usuario);

    try {
      if (usuarioValido.success) {
        const hashedPassword = bcrypt.hashSync(usuario.password, 10);

        usuario.password = hashedPassword;

        UsuarioModel.createUsuario(usuario, (err, data) => {
          if (err) {
            res.status(500).json({ error: 'Error al crear usuario' });
          } else {
            res.status(201).json(data);
          }
        });
      } else {
        throw new Error(usuarioValido.error.errors[0].message);
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  updateUsuario = (req, res) => {
    const id = req.params.id;
    const usuario = req.body;

    const usuarioValido = usuarioSchema.safeParse(usuario);

    try {
      if (usuarioValido.success) {
        UsuarioModel.updateUsuario(id, usuario, (err, data) => {
          if (err) {
            res.status(500).json({ error: 'Error al actualizar usuario' });
          } else {
            res.json(data);
          }
        });
      } else {
        throw new Error(usuarioValido.error.errors[0].message);
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  deleteUsuario = (req, res) => {
    const id = req.params.id;
    try {
      UsuarioModel.deleteUsuario(id, (err, data) => {
        if (err) {
          res.status(500).json({ error: 'Error al eliminar usuario' });
        } else {
          res.json(data);
        }
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  login = (req, res) => {
    // ✅ soporta ambos: mail (viejo) y email (front actual)
    const mail = req.body.mail || req.body.email;
    const password = req.body.password;

    const loginValido = loginschema.safeParse({ mail, password });

    try {
      if (loginValido.success) {
        UsuarioModel.getUserByMail(mail, (err, data) => {
          if (err) {
            res.status(500).json({ error: 'Error al iniciar sesión' });
          } else {
            if (data.length > 0) {
              try {
                const isValid = bcrypt.compareSync(password, data[0].password);
                if (!isValid) {
                  throw new Error('Contraseña incorrecta');
                }
              } catch (err) {
                res.status(400).json({ error: 'Contraseña incorrecta' });
                return;
              }

              // ✅ Token sin password
              const payload = {
                idUsuario: data[0].idUsuario,
                mail: data[0].mail,
                nombre: data[0].nombre,
                apellido: data[0].apellido,
              };

              const token = generateToken(payload);
              const user = {
                id: payload.idUsuario,
                mail: payload.mail,
                nombre: payload.nombre,
                apellido: payload.apellido,
              };

              req.session.user = user;
              req.session.save();

              res
                .cookie('authToken', token, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === 'production',
                  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                  path: '/',
                  maxAge: 1000 * 60 * 60 * 24,
                })
                .cookie('user', JSON.stringify(user), {
                  httpOnly: false,
                  secure: process.env.NODE_ENV === 'production',
                  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                  path: '/',
                  maxAge: 1000 * 60 * 60 * 24,
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
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  logout = (req, res) => {
    try {
      req.session.destroy(() => {
        res
          .clearCookie('authToken', {
            path: '/',
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            secure: process.env.NODE_ENV === 'production',
          })
          .clearCookie('user', {
            path: '/',
            httpOnly: false,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            secure: process.env.NODE_ENV === 'production',
          })
          .clearCookie('connect.sid', {
            path: '/',
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            secure: process.env.NODE_ENV === 'production',
          })
          .send({ message: 'Sesión cerrada correctamente' });
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  forgotPassword = async (req, res) => {
    const { mail } = req.body;
    if (!mail) return res.status(400).json({ error: 'Mail requerido' });

    try {
      UsuarioModel.getUserByMail(mail, async (err, data) => {
        if (err) return res.status(500).json({ error: 'Error al buscar usuario' });
        if (!data || data.length === 0)
          return res.status(404).json({ error: 'Usuario no encontrado' });

        const user = data[0];

        const token = jwt.sign(
          { idUsuario: user.idUsuario, mail: user.mail },
          process.env.JWT_SECRET,
          { expiresIn: '15m' }
        );

        const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:4200'}/reset-password/${token}`;

        await emailMiddleware.sendMail({
          to: mail,
          subject: 'Restablecer contraseña',
          html: `<p>Para restablecer tu contraseña, ingresá al siguiente link:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
        });

        return res.json({ message: 'Email enviado' });
      });
    } catch (err) {
      return res.status(500).json({ error: 'Error al enviar email' });
    }
  };

  resetPassword = (req, res) => {
    const { token, password } = req.body;
    if (!token || !password) return res.status(400).json({ error: 'Token y password requeridos' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const hashedPassword = bcrypt.hashSync(password, 10);

      UsuarioModel.updatePassword(decoded.idUsuario, hashedPassword, (err) => {
        if (err) return res.status(500).json({ error: 'Error al actualizar password' });
        return res.json({ message: 'Contraseña actualizada' });
      });
    } catch (err) {
      return res.status(400).json({ error: 'Token inválido o expirado' });
    }
  };

  sendEmail = async (req, res) => {
    const { nombre, mail, mensaje } = req.body;

    try {
      await emailMiddleware.sendMail({
        to: mailContacto,
        subject: `Contacto: ${nombre} (${mail})`,
        html: `<p><b>Nombre:</b> ${nombre}</p><p><b>Mail:</b> ${mail}</p><p><b>Mensaje:</b><br/>${mensaje}</p>`,
      });

      return res.json({ message: 'Email enviado' });
    } catch (err) {
      return res.status(500).json({ error: 'Error al enviar email' });
    }
  };

  // ✅ Devuelve el usuario autenticado a partir del JWT (cookie authToken)
  me = (req, res) => {
    try {
      const idUsuario = req.user?.idUsuario;
      if (!idUsuario) {
        return res.status(401).json({ error: 'No autenticado' });
      }

      UsuarioModel.getUsuarioById(idUsuario, (err, data) => {
        if (err) return res.status(500).json({ error: 'Error al obtener usuario' });
        if (!data || data.length === 0)
          return res.status(404).json({ error: 'Usuario no encontrado' });

        const u = data[0];
        return res.json({ id: u.idUsuario, mail: u.mail, nombre: u.nombre, apellido: u.apellido });
      });
    } catch (e) {
      return res.status(500).json({ error: 'Error al obtener usuario' });
    }
  };
}

module.exports = new UsuarioController();
