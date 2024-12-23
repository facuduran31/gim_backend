const path = require('path');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

const deleteFile = (rutaRelativa) => {
  const rutaAbsoluta = path.resolve("uploads/" + rutaRelativa);
  fs.unlink(rutaAbsoluta, (err) => {
    if (err) {
      console.error('Error al eliminar el archivo:', err);
      return;
    }
    console.log('Archivo eliminado con éxito:', rutaRelativa);
  });
}

module.exports = { upload, deleteFile };