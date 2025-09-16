const pagoModel = require('../models/pago');
const pagoSchema = require('../interfaces/pago');

class PagoController {
  getAllPagos = (req, res) => {
    try {
      pagoModel.getAllPagos((err, data) => {
        if (err) {
          throw new Error('Error al obtener los pagos');
        } else {
          res.json(data);
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

  }

  getPagoById = (req, res) => {
    const id = req.params.id;
    try {
      pagoModel.getPagoById(id, (err, data) => {
        if (err) {
          throw new Error('Error al obtener el pago');
        } else {
          res.json(data[0]);
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

  }


  createPago = (req, res) => {
    const pago = req.body;
    try {

      const pagoValido = pagoSchema.safeParse(pago);
      if (pagoValido.success) {
        pagoModel.createPago(pago, (err, data) => {
          if (err) {
            throw new Error('Error al crear el pago');
          } else {
            res.json({ message: 'Pago creado correctamente' });
          }
        });
      }
      else {
        throw new Error(pagoValido.error.errors[0].message);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

  }



  updatePago = (req, res) => {
    const datosNuevos = req.body;
    try {
      datosNuevos.id = parseInt(req.params.id);

      pagoModel.getPagoById(datosNuevos.id, (err, pago) => {
        if (err) {
          throw new Error('Error al actualizar el pago');
        }
        if (!pago) {
          throw new Error('Pago no encontrado');
        }

        const pagoActualizado = {
          ...pago[0], // Mantener los campos existentes
          ...datosNuevos // Sobrescribir con los datos enviados
        };

        const pagoValido = pagoSchema.safeParse(pagoActualizado);
        if (pagoValido.success) {

          pagoModel.updatePago(pagoActualizado, (err, data) => {
            if (err) {
              throw new Error('Error al actualizar el pago');
            } else {
              res.json({ message: 'Pago actualizado correctamente' });
            }
          });
        } else {
          throw new Error(pagoValido.error.errors[0].message);
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  deletePago = (req, res) => {
    const id = req.params.id;

    try {
      pagoModel.getPagoById(id, (err, pago) => {
        if (err) {
          throw new Error('Error al eliminar el pago');
        }

        if (!pago) {
          throw new Error('Pago no encontrado');
        }

        pagoModel.deletePago(id, (err, data) => {
          if (err) {
            throw new Error('Error al eliminar el pago');
          } else {

            res.json({ message: 'Pago eliminado correctamente' });
          }
        });
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

  }
}

module.exports = new PagoController();