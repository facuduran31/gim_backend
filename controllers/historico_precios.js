const historicoPreciosModel = require('../models/historico_precios');
const historicoPreciosSchema = require('../interfaces/historico_precios');

class HistoricoPreciosController {
    getAll = (req, res) => {
        try {
            historicoPreciosModel.getAll((err, data) => {
                if (err) throw new Error('Error al obtener los históricos de precios');
                res.json(data);
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    getById = (req, res) => {
        const id = req.params.id;
        try {
            historicoPreciosModel.getById(id, (err, data) => {
                if (err) throw new Error('Error al obtener el histórico de precio');
                res.json(data[0]);
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    create = (req, res) => {
        const nuevo = req.body;
        try {
            const valido = historicoPreciosSchema.safeParse(nuevo);
            if (valido.success) {
                historicoPreciosModel.create(nuevo, (err, data) => {
                    if (err) throw new Error('Error al crear el histórico de precio');
                    res.json({ message: 'Histórico de precio creado correctamente' });
                });
            } else {
                throw new Error(valido.error.errors[0].message);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    update = (req, res) => {
        const datosNuevos = req.body;
        datosNuevos.id = parseInt(req.params.id);

        try {
            historicoPreciosModel.getById(datosNuevos.id, (err, registro) => {
                if (err) throw new Error('Error al actualizar el histórico de precio');
                if (!registro) throw new Error('Registro no encontrado');

                const actualizado = { ...registro[0], ...datosNuevos };
                const valido = historicoPreciosSchema.safeParse(actualizado);

                if (valido.success) {
                    historicoPreciosModel.update(actualizado, (err, data) => {
                        if (err) throw new Error('Error al actualizar el histórico de precio');
                        res.json({ message: 'Histórico de precio actualizado correctamente' });
                    });
                } else {
                    throw new Error(valido.error.errors[0].message);
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    delete = (req, res) => {
        const id = req.params.id;
        try {
            historicoPreciosModel.delete(id, (err, data) => {
                if (err) throw new Error('Error al eliminar el histórico de precio');
                res.json({ message: 'Histórico de precio eliminado correctamente' });
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new HistoricoPreciosController();
