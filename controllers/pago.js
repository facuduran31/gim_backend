const pagoModel = require('../models/pago');
const pagoSchema = require('../interfaces/pago');

module.exports = {
  getAll(req, res) {
    pagoModel.getAll((err, data) => {
      if (err)
        return res.status(500).json({ error: 'Error al obtener pagos', mysql: err.sqlMessage });
      res.json(data);
    });
  },

  getById(req, res) {
    pagoModel.getById(req.params.id, (err, data) => {
      if (err)
        return res.status(500).json({ error: 'Error al obtener pago', mysql: err.sqlMessage });
      res.json(data?.[0] ?? null);
    });
  },

  getBySocioPlan(req, res) {
    pagoModel.getBySocioPlan(req.params.idSocioPlan, (err, data) => {
      if (err)
        return res.status(500).json({ error: 'Error al obtener pagos', mysql: err.sqlMessage });
      res.json(data);
    });
  },

  getBySocio(req, res) {
    pagoModel.getBySocio(req.params.idSocio, (err, data) => {
      if (err)
        return res.status(500).json({ error: 'Error al obtener pagos', mysql: err.sqlMessage });
      res.json(data);
    });
  },

  create(req, res) {
    const nuevo = req.body;
    console.log('Pago recibido:', nuevo);

    const valido = pagoSchema.safeParse(nuevo);
    if (!valido.success) {
      return res.status(400).json({ error: 'Datos inválidos', details: valido.error.errors });
    }

    pagoModel.create(nuevo, (err, result) => {
      if (err) {
        console.error('ERROR MySQL create pago:', err.code, err.sqlMessage);

        if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.code === 'ER_NO_REFERENCED_ROW') {
          return res.status(400).json({
            error: 'Foreign key: idSocioPlan o idMetodoPago no existe',
            mysql: err.sqlMessage,
          });
        }

        return res.status(500).json({ error: 'Error al crear pago', mysql: err.sqlMessage });
      }

      res.status(201).json({ message: 'Pago creado correctamente', idPago: result.insertId });
    });
  },

  delete(req, res) {
    pagoModel.delete(req.params.id, (err) => {
      if (err)
        return res.status(500).json({ error: 'Error al eliminar pago', mysql: err.sqlMessage });
      res.json({ message: 'Pago eliminado correctamente' });
    });
  },
};
