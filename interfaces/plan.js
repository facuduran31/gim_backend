class Plan {
  id;
  nombre;
  descripcion;
  precio;
  duracion;
  diasPorSemana;
  idGimnasio;

  constructor(id, nombre, descripcion, precio, duracion, diasPorSemana, idGimnasio) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.duracion = duracion;
    this.diasPorSemana = diasPorSemana;
    this.idGimnasio = idGimnasio;
  }
}

module.exports = Plan;