const z = require('zod');

const socioSchema = z.object({
  id: z.number().int().positive().optional(),
  nombre: z.string(),
  apellido: z.string(),
  dni: z.string(),
  telefono: z.string(),
  activo: z.boolean(),
  idGimnasio: z.number().int().positive(),
});

module.exports = socioSchema;
