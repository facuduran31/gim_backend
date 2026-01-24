const planModel = require('../models/plan');
const historicoPreciosModel = require('../models/historico_precios');
const planSchema = require('../interfaces/plan');

class PlanController {
  getAllPlanes = (req, res) => {
    planModel.getAllPlanes((err, data) => {
      if (err) return res.status(500).json({ error: 'Error al obtener los planes' });
      res.status(200).json(data);
    });
  };

  getPlanById = (req, res) => {
    const id = Number(req.params.id);
    planModel.getPlanById(id, (err, data) => {
      if (err) return res.status(500).json({ error: 'Error al obtener el plan' });
      res.status(200).json(data);
    });
  };

  getPlanesByGimnasio = (req, res) => {
    const idGimnasio = Number(req.params.idGimnasio);
    planModel.getPlanesByGimnasio(idGimnasio, (err, data) => {
      if (err) return res.status(500).json({ error: 'Error al obtener los planes' });
      res.status(200).json(data);
    });
  };

  getPlanActualByIdSocio = (req, res) => {
    const idSocio = Number(req.params.idSocio);
    planModel.getPlanActualByIdSocio(idSocio, (err, data) => {
      if (err) return res.status(500).json({ error: 'Error al obtener el plan actual del socio' });
      res.status(200).json(data?.[0] ?? null);
    });
  };

  createPlan = (req, res) => {
    const plan = req.body;

    const planValido = planSchema.safeParse(plan);
    if (!planValido.success) {
      return res
        .status(400)
        .json({ error: planValido.error.errors[0].message, details: planValido.error.errors });
    }

    planModel.createPlan(plan, (err, data) => {
      if (err)
        return res.status(500).json({ error: 'Error al crear el plan', mysql: err.sqlMessage });

      const idPlan = data.insertId;

      // ✅ Insertar histórico vigente (fechaHasta NULL)
      historicoPreciosModel.createHistoricoPrecio({ idPlan, precio: plan.precio }, (err2) => {
        if (err2) {
          console.error('Error al guardar histórico de precios:', err2);
          // no frenamos la creación del plan, pero lo reportamos
        }
        return res.status(201).json({ message: 'Plan creado con éxito', idPlan });
      });
    });
  };

  updatePlan = (req, res) => {
    const idPlan = Number(req.params.id);

    const plan = { ...req.body, idPlan }; // ✅ unificamos a idPlan (no id)

    const planValido = planSchema.safeParse(plan);
    if (!planValido.success) {
      // 👇 esto es lo que vos estabas viendo en console.log(planValido.error)
      return res
        .status(400)
        .json({ error: planValido.error.errors[0].message, details: planValido.error.errors });
    }

    // 1) traer precio vigente anterior
    historicoPreciosModel.getUltimoHistoricoByPlan(idPlan, (err, oldData) => {
      if (err)
        return res
          .status(500)
          .json({ error: 'Error al obtener histórico actual', mysql: err.sqlMessage });

      const precioAnterior = oldData?.length ? Number(oldData[0].precio) : null;

      // 2) update datos del plan (SIN precio real en tabla, pero tu model lo hará con columnas propias)
      planModel.updatePlan(plan, (err2) => {
        if (err2)
          return res
            .status(500)
            .json({ error: 'Error al actualizar el plan', mysql: err2.sqlMessage });

        // 3) si cambió el precio, cerramos histórico anterior y abrimos nuevo
        const precioNuevo = Number(plan.precio);

        const cambioPrecio = precioAnterior === null ? true : precioNuevo !== precioAnterior;

        if (!cambioPrecio) {
          return res
            .status(200)
            .json({ message: 'Plan actualizado con éxito (sin cambio de precio)' });
        }

        historicoPreciosModel.cerrarHistoricoPrecio(idPlan, (err3) => {
          if (err3) console.error('Error al cerrar histórico de precios:', err3);

          historicoPreciosModel.createHistoricoPrecio({ idPlan, precio: precioNuevo }, (err4) => {
            if (err4) console.error('Error al crear histórico de precios:', err4);
            return res
              .status(200)
              .json({ message: 'Plan actualizado con éxito (precio actualizado)' });
          });
        });
      });
    });
  };

  deletePlan = (req, res) => {
    const id = Number(req.params.id);
    planModel.deletePlan(id, (err) => {
      if (err)
        return res.status(500).json({ error: 'Error al eliminar el plan', mysql: err.sqlMessage });
      res.status(200).json({ message: 'Plan eliminado con éxito' });
    });
  };
}

module.exports = new PlanController();
