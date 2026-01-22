const z = require('zod');

const usuarioSchema = z.object({
  id: z.number().int().positive().optional(),
  nombre: z.string(),
  apellido: z.string(),
  mail: z.string().email(),
  password: z.string(),
  deletedAt: z.date().optional(),
});

const loginschema = z.object({
  mail: z.string().email(),
  password: z.string(),
});

module.exports = { usuarioSchema, loginschema };
