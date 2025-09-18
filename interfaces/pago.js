const z = require('zod');

const pagoSchema = z.object({
    id: z.number().int().positive().optional(),
    idInscripcion: z.number().int(),
    idMetodoPago: z.number().int(),
    monto: z.number().positive(),
    fechaPago: z.date()
});

module.exports = pagoSchema;