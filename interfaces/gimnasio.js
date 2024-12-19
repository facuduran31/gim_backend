const z = require('zod');

const gimnasioSchema = z.object({
  id: z.number().int().positive().optional(),
  nombre: z.string(),
  logo: z.string().optional(),
  idUsuario: z.number().int().positive()
});

module.exports = gimnasioSchema;