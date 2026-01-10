const ingresoModel = require('../models/ingreso.js');
const ingresoSchema = require('../interfaces/ingreso.js');

class IngresoController {

    getAllIngresos = (req, res) => {
        ingresoModel.getAllIngresos((err, data) => {
            if (err) return res.status(500).json({ error: 'Error al obtener los ingresos' });
            res.status(200).json(data);
        });
    }

    getIngresosByIdGimnasio = (req, res) => {
        const idGimnasio = req.params.idGimnasio;

        ingresoModel.getIngresosByIdGimnasio(idGimnasio, (err, data) => {
            if (err) return res.status(500).json({ error: 'Error al obtener los ingresos' });
            res.status(200).json(data);
        });
    }

    validarIngreso = async (req, res) => {
        const { dni, idGimnasio } = req.body;
        
        try {
            // 1) Buscar el socio por DNI
            const socio = await new Promise((resolve, reject) => {
                ingresoModel.getSocioByDni(dni, idGimnasio, (err, data) => {
                    if (err) reject(err);
                    else resolve(data[0]);
                });
            });
        
            if (!socio) {
                return res.status(404).json({ error: "Socio no encontrado" });
            }
        
            // 2) Consultar si tiene un plan activo
            const plan = await new Promise((resolve, reject) => {
                ingresoModel.getPlanActivo(socio.idSocio, (err, data) => {
                    if (err) reject(err);
                    else resolve(data[0]);
                });
            });
        
            if (!plan) {
                return res.status(403).json({ error: "El socio no tiene un plan activo" });
            }
        
            // 3) Crear ingreso válido
            const ingresoNuevo = {
                idGimnasio,
                idSocio: socio.idSocio,
                fechaIngreso: new Date().toISOString().split("T")[0],
                horaIngreso: new Date().toTimeString().split(" ")[0],
                esValido: true
            };
        
            ingresoModel.createIngreso(ingresoNuevo, (err) => {
                if (err) throw err;
                res.status(201).json({ message: "Ingreso validado y registrado con éxito" });
            });
        
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    createIngreso = (req, res) => {
        const ingreso = req.body;

        const valido = ingresoSchema.safeParse(ingreso);
        if (!valido.success) {
            return res.status(400).json({ error: valido.error.errors[0].message });
        }

        // Ajustar formato de fecha
        ingreso.fechaIngreso = new Date(ingreso.fechaIngreso)
            .toISOString()
            .split('T')[0];

        ingresoModel.createIngreso(ingreso, (err) => {
            if (err) return res.status(500).json({ error: 'Error al crear el ingreso' });
            res.status(201).json({ message: 'Ingreso creado con éxito' });
        });
    }

    updateIngreso = (req, res) => {
        const ingreso = req.body;
        ingreso.id = req.params.idIngreso;

        const valido = ingresoSchema.safeParse(ingreso);
        if (!valido.success) {
            return res.status(400).json({ error: valido.error.errors[0].message });
        }

        ingreso.fechaIngreso = new Date(ingreso.fechaIngreso)
            .toISOString()
            .split('T')[0];

        ingresoModel.updateIngreso(ingreso, (err) => {
            if (err) return res.status(500).json({ error: 'Error al actualizar el ingreso' });
            res.status(200).json({ message: 'Ingreso actualizado con éxito' });
        });
    }

    deleteIngreso = (req, res) => {
        const id = req.params.idIngreso;

        ingresoModel.deleteIngreso(id, (err) => {
            if (err) return res.status(500).json({ error: 'Error al eliminar el ingreso' });
            res.status(200).json({ message: 'Ingreso eliminado con éxito' });
        });
    }
}

module.exports = new IngresoController();