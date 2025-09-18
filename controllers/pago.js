const pagoModel = require('../models/pago');
const pagoSchema = require('../interfaces/pago');

class PagoController {
    getAll = (req, res) => {
        try {
            pagoModel.getAll((err, data) => {
                if (err) throw new Error('Error al obtener los pagos');
                res.json(data);
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    getById = (req, res) => {
        const id = req.params.id;
        try {
            pagoModel.getById(id, (err, data) => {
                if (err) throw new Error('Error al obtener el pago');
                res.json(data[0]);
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    create = (req, res) => {
        const nuevo = req.body;
        try {
            const valido = pagoSchema.safeParse(nuevo);
            if (valido.success) {
                pagoModel.create(nuevo, (err, data) => {
                    if (err) throw new Error('Error al crear el pago');
                    res.json({ message: 'Pago creado correctamente' });
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
            pagoModel.getById(datosNuevos.id, (err, registro) => {
                if (err) throw new Error('Error al actualizar el pago');
                if (!registro) throw new Error('Registro no encontrado');

                const actualizado = { ...registro[0], ...datosNuevos };
                const valido = pagoSchema.safeParse(actualizado);

                if (valido.success) {
                    pagoModel.update(actualizado, (err, data) => {
                        if (err) throw new Error('Error al actualizar el pago');
                        res.json({ message: 'Pago actualizado correctamente' });
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
            pagoModel.delete(id, (err, data) => {
                if (err) throw new Error('Error al eliminar el pago');
                res.json({ message: 'Pago eliminado correctamente' });
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new PagoController();
