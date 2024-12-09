const mysql = require('mysql2');

// Configuración de la conexión a la base de datos.
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'gimnasios_db', 
};

// Crear la conexión a la base de datos.
const connection = mysql.createConnection(dbConfig);

// Conectar a la base de datos.
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

module.exports = connection;