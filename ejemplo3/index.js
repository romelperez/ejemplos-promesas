(function () {

  // Función de utilidad para hacer peticiones AJAX usando jQuery.ajax() y
  // convirtiendo el objeto jQuery.Deferred() a una promesa estándar usando
  // Bluebird.
  var get = function (url) {
    return Promise.resolve($.get(url));
  };

  // Función que carga un nuevo usuario.
  var getNewUser = function () {

    // Agregar un loader.
    $('#container').html('<div id="loading">Cargando...</div>');

    var n = Math.floor(Math.random() * 10000);

    // Conseguir usuarios aleatorios de la API de Github en una promesa,
    get('http://api.github.com/users?since='+ n)

    // Filtrar el primer usuario conseguido y mapear sus datos.
    .then(function (data) {
      var user = data[0];
      return {
        name: user.login,
        avatar: user.avatar_url
      };
    })

    // Tomar el usuario y renderizar algunos de sus datos.
    // Los datos retornados del anterior .then() se pasan al siguiente.
    .then(function (user) {
      $('#container').append([
        '<div>',
          '<img height="200" src="',
            user.avatar,
          '">',
          '<br>',
          '<b>',
            user.name,
          '</b>',
        '</div>'
      ].join(''));
    })

    // Si ocurrió un error, mostrar un mensaje al respecto.
    .catch(function (err) {
      $('#container').append('Ha ocurrido un error!');
    })

    // Independiente del proceso tomado, remover el loading.
    // Después de un .catch(), se pasa al siguiente .then().
    .then(function () {
      $('#loading').remove();
    });
  };

  // Cargar un nuevo usuario al presionar el botón.
  $('#load').on('click', getNewUser);

  // Cargar un usuario al cargar la página.
  getNewUser();

})();
