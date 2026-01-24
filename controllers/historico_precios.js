const historicoPreciosModel = require('../models/historico_precios');
const historicoPreciosSchema = require('../interfaces/historico_precios');

class HistoricoPreciosController {
  getAll = (req, res) => {
    historicoPreciosModel.getAll((err, data) => {
      if (err) return res.status(500).json({ message: 'Error al obtener históricos: ' + err });
      res.json(data);
    });
  };

  getById = (req, res) => {
    const id = req.params.id;
    historicoPreciosModel.getById(id, (err, data) => {
      if (err) return res.status(500).json({ message: 'Error al obtener histórico: ' + err });
      res.json(data[0] || null);
    });
  };

  getHistoricoByPlan = (req, res) => {
    const idPlan = req.params.idPlan;
    try {
      historicoPreciosModel.getHistoricoByPlan(idPlan, (err, data) => {
        if (err) throw new Error('Error al obtener el histórico de precios del plan');
        res.status(200).json(data);
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  create = (req, res) => {
    const nuevo = req.body;
    const valido = historicoPreciosSchema.safeParse(nuevo);

    if (!valido.success) return res.status(400).json({ message: valido.error.errors[0].message });

    historicoPreciosModel.createHistoricoPrecio(nuevo, (err, data) => {
      if (err) return res.status(500).json({ message: 'Error al crear histórico: ' + err });
      res.json({ message: 'Histórico creado correctamente', id: data.insertId });
    });
  };

  update = (req, res) => {
    const datos = { ...req.body, id: parseInt(req.params.id) };
    const valido = historicoPreciosSchema.safeParse(datos);
    if (!valido.success) return res.status(400).json({ message: valido.error.errors[0].message });

    historicoPreciosModel.update(datos, (err) => {
      if (err) return res.status(500).json({ message: 'Error al actualizar histórico: ' + err });
      res.json({ message: 'Histórico actualizado correctamente' });
    });
  };

  delete = (req, res) => {
    const id = req.params.id;
    historicoPreciosModel.delete(id, (err) => {
      if (err) return res.status(500).json({ message: 'Error al eliminar histórico: ' + err });
      res.json({ message: 'Histórico eliminado correctamente' });
    });
  };
}

module.exports = new HistoricoPreciosController();
