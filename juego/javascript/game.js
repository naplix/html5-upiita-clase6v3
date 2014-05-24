$(function() {
	//creamos un objeto que nos permite acceder a las funcionalidades de Quintus
	var Q = Quintus({
		development : true
	});

	//habilitamos los modulos a utilizar
	Q.include("Sprites, Scenes, Input, 2D, Touch");
	//indicamos la caja en la que va a pintar el juego y que se maximize
	Q.setup("contenedor-juego");
	//habilitamos los controles por teclado y touch
	Q.controls();
	Q.touch();

	//definimos la clase del jugador
	Q.Sprite.extend("Jugador", {
		//parametros de configuracion, asset, velocidad de salto
		init : function(p) {
			this._super(p, {
				asset : "player.png",
				x : 110,
				y: 50,
				jumpSpeed : -380 
			});
			//para que el jugador se pueda caer:
			this.add("2d, platformerControls");
		},
		//se ejecuta continuamente
		step : function() {
			if (Q.inputs['left'] && this.p.direction == 'right') {
				this.p.flip = 'x';
			}
			if (Q.inputs['right'] && this.p.direction == 'left') {
				this.p.flip = false;
			}

		}
	});

	//definimos la escena con sus capas
	Q.scene("nivel1", function(stage) {
		//definimos la capa de fondo, mapa, indice, sheet , tamaño de mosaico y tipo
		var background = new Q.TileLayer({
			layerIndex: 0,
			dataAsset: "mapa_nivel1.tmx",
			tileW: 70,
			tileH: 70,
			sheet: "mosaicos",
			type: Q.SPRITE_NONE
		});
		//insertamos la capa de fondo
		stage.insert(background);

		//definimos la capa de colisiones, mapa, indice, sheet y tamaño de mosaico
		var colisiones = new Q.TileLayer({
			layerIndex: 1,
			dataAsset: "mapa_nivel1.tmx",
			tileW: 70,
			tileH: 70,
			sheet: "mosaicos"
		});
		//insertamos la capa de colisiones
		stage.collisionLayer(colisiones);
		//insertamos un jugador
		//var mario = new Jugador();
		//stage.insert(mario);
		var mario = stage.insert(new Q.Jugador());
		//hacemos que la camara lo siga
		stage.add("viewport").follow(mario, {
									x : true,
									y : true
									}, {
									minX : 0,
									maxX : background.p.w,
									minY : 0,
									maxY : background.p.h
									}
						
			);
		var monstruo = stage.insert(new Q.Enemigo());
		var monstruo2 = stage.insert(new Q.Enemigo({x:500, y:100}));
	});
	
	
	
	Q.scene("game_over", function(stage){
		alert("Game Over");
	});
	
	Q.scene("ganar", function(stage){
		alert("Ganaste");
	});
	
	//una vez que los recursos se han cargado se ejecuta el juego
	Q.load("mapa_nivel1.tmx, enemigo.png, player.png, tiles_map.png", function() {
		//definimos el mapa nombre logico, imagen y tamaño del mosaico; asigno el nombre mosaicos a tiled_map.png y en el new colisiones
		//arriba lo ponemos
		Q.sheet("mosaicos", "tiles_map.png", {
			tilew:70,
			tileh:70
		});
		//se ejecuta la escena 1
		Q.stageScene("nivel1");
	});
	
	//definir al enemigo cambiamos asset y nombre de la clase,  dar velocidad en x
	//cargar la imagen y quitar controles
	Q.Sprite.extend("Enemigo", {
		init : function(p) {
			this._super(p, {
				x: 800,
				y: 150,
				asset: "enemigo.png",
				vx: 150 //para que se mueva
			});
			this.add("2d, aiBounce");
			//colisiones para matar al enemigo
			this.on("bump.top", function(colision){
				if(colision.obj.isA("Jugador")){
					this.destroy();
					Q.stageScene("ganar");
				}
			});
			
			//colisiones para matar al jugador
			this.on("bump.left, bump.right", function(colision){
				if(colision.obj.isA("Jugador")){
					colision.obj.destroy();
					Q.stageScene("game_over");
				}
			});
			
		},
		step : function() {
			if (this.p.vx > 0) {
				this.p.flip = 'x';
			}
			if (this.p.vx < 0) {
				this.p.flip = false;
			}

		}
	});
	
	//Escena Game Over, alert y despues inicia el nivel 1 de nuevo

	//Escena Ganar, alert y despues inicia el nivel 1 de nuevo
});
