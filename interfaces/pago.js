const z = require('zod');

const pagoSchema = z.object({
    id: z.number().int().positive().optional(),
    idSocioPlan: z.number().int().positive(),
    idMetodoPago: z.number().int().positive(),
    monto: z.number().positive(),
    fechaPago: z.string() // viene como YYYY-MM-DD
});

module.exports = pagoSchema;
