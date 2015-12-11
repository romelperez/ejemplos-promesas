var fs = require('fs');

var file = __dirname +'/file.txt';

// Crear nueva promesa.
var p = new Promise(function (resolve, reject) {
  console.log('Promesa comenzada.');

  // Ejecutar proceso asíncrono.
  fs.readFile(file, 'utf-8', function (err, data) {

    // Si ocurrió un error.
    if (err) {

      // Rechazar la promesa.
      return reject(err);
    }

    // Sino, cumplirla.
    resolve(data);

    console.log('Promesa procesada.');
  });
});

// Manejar cuando la promesa se haya cumplido.
p.then(function (data) {
  console.log('Promesa cumplida:', data);
});

// Manejar cuando la promesa se haya rechazado.
p.catch(function (err) {
  console.log('Promesa rechazada:', err);
});
