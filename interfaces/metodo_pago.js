const z = require('zod');

const metodo_pagoSchema = z.object({
  id: z.number().int().positive().optional(),
  idPlan: z.number().int(),
  precio: z.number().positive(),
  fechaDesde: z.date(),
  fechaHasta: z.date(),
  deletedAt: z.date().optional(),
});

module.exports = metodo_pagoSchema;
