const { z } = require('zod');

const planSchema = z.object({
  idPlan: z.coerce.number().int().optional(),

  idGimnasio: z.coerce.number().int(),
  nombre: z.string().min(2),
  descripcion: z.string().optional().nullable(),
  duracion: z.coerce.number().int().positive(),
  diasPorSemana: z.coerce.number().int().positive(),
  precio: z.coerce.number().positive(),
});

module.exports = planSchema;
