$(function() {
	//creamos un objeto que nos permite acceder a las funcionalidades de Quintus
	var Q = Quintus({
		development : true
	});

	//habilitamos los modulos a utilizar
	Q.include();
	//indicamos la caja en la que va a pintar el juego y que se maximize
	Q.setup();
	//habilitamos los controles por teclado y touch


	//definimos la clase del jugador
	Q.Sprite.extend("Jugador", {
		//parametros de configuracion, asset, velocidad de salto
		init : function(p) {
			
		},
		//se ejecuta continuamente
		step : function() {

		}
	});

	//definimos la escena con sus capas
	Q.scene("nivel1", function(stage) {
		//definimos la capa de fondo, mapa, indice, sheet , tamaño de mosaico y tipo
		var background = new Q.TileLayer({});
		//insertamos la capa de fondo


		//definimos la capa de colisiones, mapa, indice, sheet y tamaño de mosaico
		var colisiones = new Q.TileLayer({});
		//insertamos la capa de colisiones

		//insertamos un jugador

		//hacemos que la camara lo siga

	});
	
	//una vez que los recursos se han caragado se ejecuta el juego
	Q.load("", function() {
		//definimos el mapa nombre logico, imagen y tamaño del mosaico
		Q.sheet("", "", {

		});
		//se ejecuta la escena 1
		Q.stageScene("nivel1");
	});
	
	//definir al enemigo cambiamos asset y nombre de la clase,  dar velocidad en x
	//cargar la imagen y quitar controles
	Q.Sprite.extend("Enemigo", {
		init : function(p) {
			this._super(p, {
				
			});
			this.add("2d, aiBounce");
			//colisiones para matar al enemigo
			
			
			//colisiones para matar al jugador
			
		},
		step : function() {

		}
	});
	
	//Escena Game Over, alert y despues inicia el nivel 1 de nuevo

	//Escena Ganar, alert y despues inicia el nivel 1 de nuevo
});
