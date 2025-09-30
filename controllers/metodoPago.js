const metodoPagoModel = require('../models/metodoPago');
const metodoPagoSchema = require('../interfaces/metodoPago');

class MetodoPagoController {
  getAllMetodosPago = (req, res) => {
    try {
      metodoPagoModel.getAllMetodosPago((err, data) => {
        if (err) {
          throw new Error('Error al obtener los métodos de pago');
        } else {
          res.json(data);
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

  }

  getMetodoPagoById = (req, res) => {
    const id = req.params.id;
    try {
      metodoPagoModel.getMetodoPagoById(id, (err, data) => {
        if (err) {
          throw new Error('Error al obtener el método de pago');
        } else {
          res.json(data[0]);
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

  }


  createMetodoPago = (req, res) => {
    const metodoPago = req.body;
    try {

      const metodoPagoValido = metodoPagoSchema.safeParse(metodoPago);
      if (metodoPagoValido.success) {
        metodoPagoModel.createMetodoPago(metodoPago, (err, data) => {
          if (err) {
            throw new Error('Error al crear el método de pago');
          } else {
            res.json({ message: 'Método de pago creado correctamente' });
          }
        });
      }
      else {
        throw new Error(metodoPagoValido.error.errors[0].message);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

  }



  updateMetodoPago = (req, res) => {
    const datosNuevos = req.body;
    try {
      datosNuevos.id = parseInt(req.params.id);

      metodoPagoModel.getMetodoPagoById(datosNuevos.id, (err, metodoPago) => {
        if (err) {
          throw new Error('Error al actualizar el método de pago');
        }
        if (!metodoPago) {
          throw new Error('Método de pago no encontrado');
        }

        const metodoPagoActualizado = {
          ...metodoPago[0], // Mantener los campos existentes
          ...datosNuevos // Sobrescribir con los datos enviados
        };

        const metodoPagoValido = metodoPagoSchema.safeParse(metodoPagoActualizado);
        if (metodoPagoValido.success) {

          metodoPagoModel.updateMetodoPago(metodoPagoActualizado, (err, data) => {
            if (err) {
              throw new Error('Error al actualizar el método de pago');
            } else {
              res.json({ message: 'Método de pago actualizado correctamente' });
            }
          });
        } else {
          throw new Error(metodoPagoValido.error.errors[0].message);
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  deleteMetodoPago = (req, res) => {
    const id = req.params.id;

    try {
      metodoPagoModel.getMetodoPagoById(id, (err, metodoPago) => {
        if (err) {
          throw new Error('Error al eliminar el método de pago');
        }

        if (!metodoPago) {
          throw new Error('Método de pago no encontrado');
        }

        metodoPagoModel.deleteMetodoPago(id, (err, data) => {
          if (err) {
            throw new Error('Error al eliminar el método de pago');
          } else {

            res.json({ message: 'Método de pago eliminado correctamente' });
          }
        });
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

  }
}

module.exports = new MetodoPagoController();