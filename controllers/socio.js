const socioModel = require('../models/socio');
const socioSchema = require('../interfaces/socio'); // schema zod para validar datos

class SocioController {
  getAllSocios = (req, res) => {
    socioModel.getAllSocios((err, data) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(data);
    });
  };

  getSocioById = (req, res) => {
    const idSocio = req.params.id;
    socioModel.getSocioById(idSocio, (err, data) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(data[0]);
    });
  };

  getSocioByDni = (req, res) => {
    const dni = req.params.dni;
    socioModel.getSocioByDni(dni, (err, data) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(data[0]);
    });
  };

  getSociosByGimnasio = (req, res) => {
    const idGimnasio = req.params.idGimnasio;
    socioModel.getSociosByGimnasio(idGimnasio, (err, data) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(data);
    });
  };

  validarIngreso = (req, res) => {
    const dni = req.params.dni;
    socioModel.validarIngreso(dni, (err, data) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ existe: data.length > 0 });
    });
  };

  createSocio = (req, res) => {
    const { dni, nombre, apellido, telefono, estado, idGimnasio, idPlan, duracion } = req.body;

    // Construir objeto socio para validar
    const socio = {
      dni,
      nombre,
      apellido,
      telefono,
      activo: estado,
      idGimnasio,
    };

    try {
      // Validación Zod
      const socioValido = socioSchema.safeParse(socio);
      if (!socioValido.success) {
        console.log('Error de validación:', socioValido.error.errors);
        return res.status(400).json({ error: socioValido.error.errors[0].message });
      }

      // Crear socio en la tabla 'socio'
      socioModel.createSocio(socio, (err, data) => {
        if (err) {
          console.log('Error al crear socio:', err);
          return res.status(500).json({ error: err.message });
        }

        const idSocio = data.insertId;

        // Si se envía idPlan, crear socio_plan
        if (idPlan) {
          const fechaInicio = new Date();
          const fechaFin = new Date();
          fechaFin.setMonth(fechaFin.getMonth() + (parseInt(duracion) || 1));

          const socioPlan = {
            idSocio,
            idPlan,
            fechaInicio,
            fechaFin,
          };

          socioModel.createSocioPlan(socioPlan, (err2, data2) => {
            if (err2) {
              console.log('Error al crear plan del socio:', err2);
              return res.status(201).json({
                message: 'Socio creado, pero no se pudo crear el plan',
                idSocio,
              });
            }

            return res.status(201).json({
              message: 'Socio creado correctamente con plan',
              idSocio,
              idSocioPlan: data2.insertId,
            });
          });
        } else {
          return res.status(201).json({
            message: 'Socio creado correctamente',
            idSocio,
          });
        }
      });
    } catch (error) {
      console.log('Error general:', error);
      return res.status(500).json({ error: error.message });
    }
  };

  updateSocio = (req, res) => {
    const { idSocio, dni, nombre, apellido, telefono, estado, idGimnasio, idPlan, duracion } =
      req.body;

    const socio = { idSocio, dni, nombre, apellido, telefono, activo: estado, idGimnasio };

    // Validación Zod
    try {
      const socioValido = socioSchema.safeParse(socio);
      if (!socioValido.success) {
        console.log('Error de validación:', socioValido.error.errors);
        return res.status(400).json({ error: socioValido.error.errors[0].message });
      }

      // Actualizar socio
      socioModel.updateSocio(socio, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });

        // Si hay un plan para actualizar
        if (idPlan) {
          // Obtener último plan del socio
          socioModel.getUltimoPlan(idSocio, (err2, planes) => {
            if (err2) return res.status(500).json({ error: err2.message });

            const ultimoPlan = planes[0]; // si existe
            let fechaInicio = new Date();
            if (ultimoPlan) {
              fechaInicio = new Date(ultimoPlan.fechaFin);
              fechaInicio.setDate(fechaInicio.getDate() + 1); // empieza al día siguiente
            }
            const fechaFin = new Date(fechaInicio);
            fechaFin.setMonth(fechaFin.getMonth() + duracion);

            // Crear nuevo socio_plan solo si el plan es distinto
            if (!ultimoPlan || ultimoPlan.idPlan !== idPlan) {
              const socioPlan = { idSocio, idPlan, fechaInicio, fechaFin };
              socioModel.createSocioPlan(socioPlan, (err3, data3) => {
                if (err3) return res.status(500).json({ error: err3.message });
                return res.status(200).json({
                  message: 'Socio actualizado y plan cambiado',
                  idSocio,
                  idSocioPlan: data3.insertId,
                });
              });
            } else {
              // Plan no cambió
              return res.status(200).json({ message: 'Socio actualizado correctamente', idSocio });
            }
          });
        } else {
          // No se envió idPlan
          return res.status(200).json({ message: 'Socio actualizado correctamente', idSocio });
        }
      });
    } catch (error) {
      console.log('Error general:', error);
      return res.status(500).json({ error: error.message });
    }
  };

  deleteSocio = (req, res) => {
    const idSocio = req.params.id;
    socioModel.deleteSocio(idSocio, (err, data) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: 'Socio eliminado correctamente' });
    });
  };
}

module.exports = new SocioController();
