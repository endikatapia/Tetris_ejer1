// ************************************
// *     EJERCICIO 1                   *
// ************************************

// ============== Point =======================

function Point (x, y) {
	this.x = x;
	this.y = y;    
}

// ============== Rectangle ====================
function Rectangle() {}

//recibe los 2 puntos del bloque como parametro
Rectangle.prototype.init = function(p1,p2) {
	this.px = p1.x;
	this.py = p1.y;
	this.width = p2.x - p1.x;
	this.height = p2.y - p1.y;
	this.lineWidth= 1;
	this.color = 'black';
}

Rectangle.prototype.draw = function() {

	// TU CÓDIGO AQUÍ:
	// pinta un rectángulo del color actual en pantalla en la posición px,py, con
	// la anchura y altura actual y una línea de anchura=lineWidth. Ten en cuenta que 
	// en este ejemplo la variable ctx es global y que guarda el contexto (context) 
	// para pintar en el canvas.
	
	//comenzar camino
	ctx.beginPath();
	
	//nos movemos al punto P1(esquina superior derecha), donde se empieza a pintar el rectangulo
	ctx.moveTo(this.px,this.py);

	//nos colocamos en el punto P1(p1.x,p1.y) y dibujamos un rectangulo con la anchura this.width y
	//la altura this.heigth.
	ctx.lineTo(this.px+this.width,this.py);
	ctx.lineTo(this.px+this.width,this.py+this.height);
	ctx.lineTo(this.px,this.py+this.height);

	//cerrar camino
	ctx.closePath();
	
	//la anchura de la linea=this.lineWidth
    ctx.lineWidth = this.lineWidth;

	//rellenar el rectangulo del color this.color
    ctx.fillStyle = this.color;
    ctx.fill();

	//finalizamos con stroke haciendo el contorno del rectangulo 
    ctx.stroke();
}


Rectangle.prototype.setLineWidth = function(width) { this.lineWidth=width}
Rectangle.prototype.setFill = function(color) { this.color = color}

// ============== Block ===============================

function Block (pos, color) {


	// TU CÓDIGO AQUÍ: este es el constructor de la clase Block. Recibe dos parámetros, pos y color. 
	// Pos = posición de la celda, por ejemplo, (9,19).
	// color = color que hay que emplear para pintar el bloque.
	// Internamente este método crea dos puntos (empleando las coordenadas del pixel)
	// y llama al método init de la clase Rectangle, pasándole como parámetro,
	// estos dos puntos.
	// Sería interesante que emplearas las constantes Block.BLOCK_SIZE y Block.OUTLINE_WIDTH,
	// para establecer la anchura del bloque y la anchura de la línea.
	
	//coordenadas (x,y) de la celda. Por ejemplo (1,1)
	this.x = pos.x;
    this.y = pos.y;

	//Se crean internamente 2 puntos empleando las coordenadas del pixel
	//Imaginemos que tenemos la coordenadas pos.x=1, pos.y=1.
	//ese punto1 se convertira en (1*30,1*30)=(30,30) y el rectangulo se empezara a pintar en ese punto.
	//para completar el bloque cuadrado necesitamos que acabe en (60,60). Para ello le sumamos 30 pixeles
	//tanto en altura como en anchura y asi queda (60,60).

	var nuevaposx = pos.x*Block.BLOCK_SIZE;
	var nuevaposy = pos.y*Block.BLOCK_SIZE;

	var punto1 = new Point(nuevaposx,nuevaposy);
    var punto2 = new Point(punto1.x + Block.BLOCK_SIZE, punto1.y + Block.BLOCK_SIZE);

	//se le llama al metodo init de la clase Rectangle y le pasamos los 2 puntos definidos anteriormente
	//el (30,30) y el (60,60).
	this.init(punto1,punto2);
	this.setFill(color);
    this.setLineWidth(Block.OUTLINE_WIDTH);


}

//una casilla es un cuadrado de 30 pixels de ancho. Cada bloque ocupa una única casilla
Block.BLOCK_SIZE = 30;
//anchura de la linea que rodea al bloque
Block.OUTLINE_WIDTH = 2;


// TU CÓDIGO: emplea el patrón de herencia (Block es un Rectangle)
//Block hereda de la clase Rectangle
Block.prototype = new Rectangle();
//el constructor de bloque es bloque
Block.prototype.constructor = Block;



