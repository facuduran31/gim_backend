const z = require('zod');

const ingresoSchema = z.object({
  id: z.number().int().positive().optional(),
  idGimnasio: z.int().positive(),
  idSocio: z.int().positive(),
  fechaGimnasio: z.date(),
  horaIngreso: z.time(),
  esValido: z.boolean()
});

module.exports = ingresoSchema;