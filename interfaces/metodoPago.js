const z = require('zod');

const metodoPagoSchema = z.object({
  id: z.number().int().positive().optional(),
  nombre: z.string(),
  descripcion: z.string().optional(),
});

module.exports = metodoPagoSchema;