const historicoPrecioModel = require('../models/historicoPrecio');
const historicoPrecioSchema = require('../interfaces/historicoPrecio');

class HistoricoPrecioController {
  getAllHistoricosPrecio = (req, res) => {
    try {
      historicoPrecioModel.getAllHistoricoPrecio((err, data) => {
        if (err) {
          throw new Error('Error al obtener los históricos de precios');
        } else {
          res.json(data);
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

  }

  getHistoricoPrecioById = (req, res) => {
    const id = req.params.id;
    try {
      historicoPrecioModel.getHistoricoPrecioById(id, (err, data) => {
        if (err) {
          throw new Error('Error al obtener el histórico de precio');
        } else {
          res.json(data[0]);
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

  }


  createHistoricoPrecio = (req, res) => {
    const historicoPrecio = req.body;
    try {

      const historicoPrecioValido = historicoPrecioSchema.safeParse(historicoPrecio);
      if (historicoPrecioValido.success) {
        historicoPrecioModel.createHistoricoPrecio(historicoPrecio, (err, data) => {
          if (err) {
            throw new Error('Error al crear el histórico precio');
          } else {
            res.json({ message: 'Histórico precio creado correctamente' });
          }
        });
      }
      else {
        throw new Error(historicoPrecioValido.error.errors[0].message);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

  }



  updateHistoricoPrecio = (req, res) => {
    const datosNuevos = req.body;
    try {
      datosNuevos.id = parseInt(req.params.id);

      historicoPrecioModel.getHistoricoPrecioById(datosNuevos.id, (err, historicoPrecio) => {
        if (err) {
          throw new Error('Error al actualizar el histórico precio');
        }
        if (!historicoPrecio) {
          throw new Error('Histórico precio no encontrado');
        }

        const historicoPrecioActualizado = {
          ...historicoPrecio[0], // Mantener los campos existentes
          ...datosNuevos // Sobrescribir con los datos enviados
        };

        const historicoPrecioValido = historicoPrecioSchema.safeParse(historicoPrecioActualizado);
        if (historicoPrecioValido.success) {

          historicoPrecioModel.updateHistoricoPrecio(historicoPrecio, (err, data) => {
            if (err) {
              throw new Error('Error al actualizar el histórico precio');
            } else {
              res.json({ message: 'Histórico precio actualizado correctamente' });
            }
          });
        } else {
          throw new Error(historicoPrecioValido.error.errors[0].message);
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  deleteHistoricoPrecio = (req, res) => {
    const id = req.params.id;

    try {
      historicoPrecioModel.getHistoricoPrecioById(id, (err, historicoPrecio) => {
        if (err) {
          throw new Error('Error al eliminar el histórico precio');
        }

        if (!historicoPrecio) {
          throw new Error('Histórico precio no encontrado');
        }

        historicoPrecio.deleteHistoricoPrecio(id, (err, data) => {
          if (err) {
            throw new Error('Error al eliminar el histórico precio');
          } else {

            res.json({ message: 'Histórico precio eliminado correctamente' });
          }
        });
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

  }
}

module.exports = new HistoricoPrecioController();