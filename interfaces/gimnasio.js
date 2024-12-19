class Gimnasio {
  id;
  nombre;
  logo;
  idUsuario;

  constructor(id, nombre, logo, idUsuario) {
    this.id = id;
    this.nombre = nombre;
    this.logo = logo;
    this.idUsuario = idUsuario;
  }
}

module.exports = Gimnasio;