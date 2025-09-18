const metodoPagoModel = require('../models/metodo_pago');
const metodoPagoSchema = require('../interfaces/metodo_pago');

class MetodoPagoController {
    getAll = (req, res) => {
        try {
            metodoPagoModel.getAll((err, data) => {
                if (err) throw new Error('Error al obtener los métodos de pago');
                res.json(data);
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    getById = (req, res) => {
        const id = req.params.id;
        try {
            metodoPagoModel.getById(id, (err, data) => {
                if (err) throw new Error('Error al obtener el método de pago');
                res.json(data[0]);
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    create = (req, res) => {
        const nuevo = req.body;
        try {
            const valido = metodoPagoSchema.safeParse(nuevo);
            if (valido.success) {
                metodoPagoModel.create(nuevo, (err, data) => {
                    if (err) throw new Error('Error al crear el método de pago');
                    res.json({ message: 'Método de pago creado correctamente' });
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
            metodoPagoModel.getById(datosNuevos.id, (err, registro) => {
                if (err) throw new Error('Error al actualizar el método de pago');
                if (!registro) throw new Error('Registro no encontrado');

                const actualizado = { ...registro[0], ...datosNuevos };
                const valido = metodoPagoSchema.safeParse(actualizado);

                if (valido.success) {
                    metodoPagoModel.update(actualizado, (err, data) => {
                        if (err) throw new Error('Error al actualizar el método de pago');
                        res.json({ message: 'Método de pago actualizado correctamente' });
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
            metodoPagoModel.delete(id, (err, data) => {
                if (err) throw new Error('Error al eliminar el método de pago');
                res.json({ message: 'Método de pago eliminado correctamente' });
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new MetodoPagoController();
