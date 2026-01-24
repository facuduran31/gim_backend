const z = require('zod');

const historico_preciosSchema = z.object({
  id: z.number().int().positive().optional(),
  idPlan: z.number().int(),
  precio: z.number().positive(),
  fechaDesde: z.coerce.date().optional(),
  fechaHasta: z.coerce.date().nullable().optional(),
  deletedAt: z.date().optional(),
});

module.exports = historico_preciosSchema;
