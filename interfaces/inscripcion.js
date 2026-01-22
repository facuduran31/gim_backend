const z = require('zod');

const inscripcionSchema = z.object({
  id: z.number().int().positive().optional(),
  idSocio: z.number().int().positive(),
  idPlan: z.number().int().positive(),
  fechaInicio: z.string(),
  fechaFin: z.string(),
  deletedAt: z.date().optional(),
});

module.exports = inscripcionSchema;
