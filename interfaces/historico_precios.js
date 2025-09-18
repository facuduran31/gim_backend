const z = require('zod');

const historico_preciosSchema = z.object({
    id: z.number().int().positive().optional(),
    idPlan: z.number().int(),
    precio: z.number().positive(),
    fechaDesde: z.date(),
    fechaHasta: z.date()
});

module.exports = historico_preciosSchema;