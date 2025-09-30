const z = require('zod');

const historicoPreciosSchema = z.object({
  id: z.number().int().positive().optional(),
  idPlan: z.number().int().positive(),
  precio: z.number().positive(),
  fechaDesde: z.string(),
  fechaHasta: z.string().optional()
});

module.exports = historicoPreciosSchema
  ;