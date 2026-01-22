const pagoModel = require('../models/pago');
const pagoSchema = require('../interfaces/pago');

class PagoController {
  getAll = (req, res) => {
    pagoModel.getAll((err, data) => {
      if (err) return res.status(500).json(err);
      res.json(data);
    });
  };

  getById = (req, res) => {
    pagoModel.getById(req.params.id, (err, data) => {
      if (err) return res.status(500).json(err);
      res.json(data[0]);
    });
  };

  // 🔥 ESTE ES EL QUE TE FALTABA
  getBySocioPlan = (req, res) => {
    const { idSocioPlan } = req.params;

    pagoModel.getBySocioPlan(idSocioPlan, (err, data) => {
      if (err) return res.status(500).json(err);
      res.json(data);
    });
  };

  create = (req, res) => {
    const nuevo = req.body;

    const valido = pagoSchema.safeParse(nuevo);
    if (!valido.success) {
      return res.status(400).json(valido.error.errors);
    }

    pagoModel.create(nuevo, (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Pago creado correctamente' });
    });
  };

  delete = (req, res) => {
    pagoModel.delete(req.params.id, (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Pago eliminado correctamente' });
    });
  };
}

module.exports = new PagoController();
