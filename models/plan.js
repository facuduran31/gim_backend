const db = require('./db.js');

class planModel{
    getAllPlanes = (callback) => {
        db.query('SELECT * FROM plan', callback);
    }

    getPlanById = (id, callback) => {
        db.query('SELECT * FROM plan WHERE idPlan = ?', [id], callback);
    }
    
    getPlanesByGimnasio = (idGimnasio, callback) => {
        db.query('SELECT * FROM plan WHERE idGimnasio = ?', [idGimnasio], callback);
    }

    createPlan = (plan, callback) => {
        db.query('INSERT INTO plan (nombre, descripcion, precio, duracion, diasPorSemana, idGimnasio) VALUES (?, ?, ?, ?, ?, ?)', [plan.nombre, plan.descripcion, plan.precio, plan.duracion, plan.diasPorSemana, plan.idGimnasio], callback);
    }

    updatePlan = (plan, callback) => {
        db.query('UPDATE plan SET nombre = ?, descripcion = ?, precio = ?, duracion = ?, diasPorSemana = ?, idGimnasio = ? WHERE idPlan = ?', [plan.nombre, plan.descripcion, plan.precio, plan.duracion, plan.diasPorSemana, plan.idGimnasio, plan.id], callback);
    }

    deletePlan = (id, callback) => {
        db.query('DELETE FROM plan WHERE idPlan = ?', [id], callback);
    }
}

module.exports = new planModel();