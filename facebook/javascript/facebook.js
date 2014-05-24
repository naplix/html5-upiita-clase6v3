var MIAPP = {
	publicar : function(mensaje) {

	},

	muestraLogin : function() {
		//al mostrar el login le pedimos al usuario permisos (scope) para la App
		//si acepta llamar a jugar
	}
};

$(function() {
	FB.init({
		appId : '',
		xfbml : true,
		version : 'v2.0'
	});
	
    //si es usuario esta conectado (connected) ->Jugar!
	//sino hay que mostrarle el login
	FB.getLoginStatus(function(response) {});

});
