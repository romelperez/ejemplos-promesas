var fs = require('fs');

// Función de utilidad para crear una promesa por conseguir el contenido de un
// archivo de forma asíncrona.
var getFile = function (file) {
  return new Promise(function (resolve, reject) {

    fs.readFile(__dirname +'/'+ file, 'utf-8', function (err, data) {

			if (err) {
        return reject(err);
      }

			// Convertir el contenido del archivo a una línea.
			data = data.replace(/\r?\n/g, '');

			resolve(data);
    });
  });
};

console.log('Promesas inicializadas.');

// Conseguir una colección de resultados desde una colección de promesas.
var files = Promise.all([
	getFile('file1.txt'),
	getFile('file2.txt'),
	getFile('file3.txt')
]);

// Todos los elementos de la colección fueron conseguidos exitósamente.
files.then(function (collection) {
	console.log('Promesas completadas:');

	collection.forEach(function (data, i) {
		console.log('Archivo '+ (i + 1) +':', data);
	});
});

// Alguna de las promesas de la colección fue rechazada.
files.catch(function (err) {
	console.log('Promesa rechazada:', err);
});
