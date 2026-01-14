const z = require('zod');

const planSchema = z.object({
  id: z.number().int().positive().optional(),
  nombre: z.string(),
  descripcion: z.string().optional(),
  precio: z.number().positive(),
  duracion: z.number().int().positive(),
  diasPorSemana: z.number().int().positive().optional(), //ver como resolver esto
  idGimnasio: z.number().int().positive(),
  deletedAt: z.date().optional()
});

module.exports = planSchema;