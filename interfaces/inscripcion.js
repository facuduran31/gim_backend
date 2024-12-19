class Inscripcion {
  id;
  idSocio;
  idPlan;
  fechaInicio;
  fechaFin;

  constructor(id, idSocio, idPlan, fechaInicio, fechaFin) {
    this.id = id;
    this.idSocio = idSocio;
    this.idPlan = idPlan;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
  }
}

module.exports = Inscripcion;