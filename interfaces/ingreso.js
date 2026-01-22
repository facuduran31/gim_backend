const { z } = require('zod');

const ingresoSchema = z.object({
  id: z.number().int().positive().optional(),

  idGimnasio: z.coerce.number().int().positive(),
  idSocio: z.coerce.number().int().positive(),

  // Fecha tipo YYYY-MM-DD
  fechaIngreso: z.coerce.date(),

  // Hora tipo "HH:mm" o "HH:mm:ss"
  horaIngreso: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/, 'Hora inválida'),

  esValido: z.boolean(),
  deletedAt: z.date().optional(),
});

module.exports = ingresoSchema;
