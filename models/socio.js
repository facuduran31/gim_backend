const db = require('./db.js');

class SocioModel {

    // ==============================
    // OBTENER TODOS LOS SOCIOS
    // ==============================
    getAllSocios = (callback) => {
        db.query(`
            SELECT 
                s.*,
                sp.idSocioPlan
            FROM socio s
            LEFT JOIN socio_plan sp 
                ON sp.idSocio = s.idSocio
                AND (sp.fechaFin IS NULL OR sp.fechaFin >= CURDATE());
        `, callback);
    }

    // ==============================
    // OBTENER SOCIO POR ID
    // ==============================
    getSocioById = (idSocio, callback) => {
        db.query(`
            SELECT 
                s.*,
                sp.idSocioPlan
            FROM socio s
            LEFT JOIN socio_plan sp 
                ON sp.idSocio = s.idSocio
                AND (sp.fechaFin IS NULL OR sp.fechaFin >= CURDATE())
            WHERE s.idSocio = ?;
        `, [idSocio], callback);
    }

    // ==============================
    // OBTENER SOCIO POR DNI
    // ==============================
    getSocioByDni = (dni, callback) => {
        db.query(`
            SELECT 
                s.*,
                sp.idSocioPlan
            FROM socio s
            LEFT JOIN socio_plan sp 
                ON sp.idSocio = s.idSocio
                AND (sp.fechaFin IS NULL OR sp.fechaFin >= CURDATE())
            WHERE s.dni = ?;
        `, [dni], callback);
    }

    // ==============================
    // OBTENER SOCIOS POR GIMNASIO
    // ==============================
    getSociosByGimnasio = (idGimnasio, callback) => {
        db.query(`
            SELECT 
                s.*,
                sp.idSocioPlan
            FROM socio s
            LEFT JOIN socio_plan sp 
                ON sp.idSocio = s.idSocio
                AND (sp.fechaFin IS NULL OR sp.fechaFin >= CURDATE())
            WHERE s.idGimnasio = ?;
        `, [idGimnasio], callback);
    }

    // ==============================
    // CREAR SOCIO
    // ==============================
    createSocio = (socio, callback) => {
        db.query(`
            INSERT INTO socio 
                (nombre, apellido, dni, telefono, activo, diaDePago, idGimnasio)
            VALUES (?, ?, ?, ?, ?, ?, ?);
        `, [
            socio.nombre,
            socio.apellido,
            socio.dni,
            socio.telefono,
            socio.activo,
            socio.diaDePago,
            socio.idGimnasio
        ], callback);
    }

    // ==============================
    // ACTUALIZAR SOCIO
    // ==============================
    updateSocio = (socio, callback) => {
        db.query(`
            UPDATE socio 
            SET 
                nombre = ?, 
                apellido = ?, 
                dni = ?, 
                telefono = ?, 
                activo = ?, 
                diaDePago = ?, 
                idGimnasio = ?
            WHERE idSocio = ?;
        `, [
            socio.nombre,
            socio.apellido,
            socio.dni,
            socio.telefono,
            socio.activo,
            socio.diaDePago,
            socio.idGimnasio,
            socio.idSocio
        ], callback);
    }

    // ==============================
    // ELIMINAR SOCIO
    // ==============================
    deleteSocio = (idSocio, callback) => {
        db.query(`
            DELETE FROM socio 
            WHERE idSocio = ?;
        `, [idSocio], callback);
    }

    // ==============================
    // VALIDAR INGRESO POR DNI
    // ==============================
    validarIngreso = (dni, callback) => {
        db.query(`
            SELECT 
                s.idSocio,
                s.nombre,
                s.apellido,
                s.activo,
                s.diaDePago,
                sp.idSocioPlan,
                p.idPlan,
                p.nombre AS nombrePlan,
                p.duracion,
                g.idGimnasio
            FROM socio s
            INNER JOIN socio_plan sp 
                ON sp.idSocio = s.idSocio
                AND (sp.fechaFin IS NULL OR sp.fechaFin >= CURDATE())
            INNER JOIN plan p 
                ON p.idPlan = sp.idPlan
            INNER JOIN gimnasio g 
                ON g.idGimnasio = p.idGimnasio
            WHERE s.dni = ?;
        `, [dni], callback);
    }
}

module.exports = new SocioModel();
