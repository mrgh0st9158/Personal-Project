class bordes{

    constructor(minX, maxX, minY, maxY) {
    this.minX = minX;
    this.maxX = maxX
    this.minY = minY
    this.maxY = maxY
    }

}

class objetoMovil{

   constructor(bordesTablero, elemento){
this.bordesTablero = bordesTablero;
this.x = parseInt(getComputedStyle(elemento).left);
this.y = parseInt(getComputedStyle(elemento).bottom);
this.ancho = parseInt(getComputedStyle(elemento).width);
this.alto = parseInt(getComputedStyle(elemento).height);
this.elemento = elemento
   }

   getBordes(){
    return new bordes(this.x - this.ancho/2, this.x + this.ancho/2,
         this.y - this.alto/2, this.y + this.alto/2);
        
   }

resetear(){
    this.ancho = parseInt(getComputedStyle(this.elemento).width);
    this.alto = parseInt(getComputedStyle(this.elemento).height);
}

}

class Bola extends objetoMovil {
    constructor(bordesTablero, elemento, velocidad, dirX, dirY){
        super(bordesTablero, elemento);
        this.velocidad = velocidad;
        this.dirX = dirX
        this.dirY = dirY
    }

    mover(){
        this.x += this.dirX * this.velocidad;
        this.y += this.dirY * this.velocidad;
        this.elemento.style.left = this.x+"px";
        this.elemento.style.bottom = this.y+"px";
        this.verificarRebote();

    }

    verificarRebote(){
        if(this.y + this.alto/2 > this.bordesTablero.maxY ||
            this.y - this.alto/2 < this.bordesTablero.minY
        ){
            this.rebotarY();
        }
    }

    rebotarX(){
        this.dirX = -this.dirX;
        
    }
    
    rebotarY(){
        this.dirY = -this.dirY;

    }

    verificarGol(){
        if(this.x - this.ancho/2 < this.bordesTablero.minX){
           return 2;
        }else if(this.x + this.ancho/2 > this.bordesTablero.maxX){
           return 1;
        }
        return 0;
    }

    resetear(x, y, dirX, dirY){
        this.x = x;
        this.y = y;
        this.dirX = dirX;
        this.dirY = dirY;
    }

}

class pala extends objetoMovil{
    constructor(bordesTablero, elemento, velocidad, keyCodeArriba, keyCodeAbajo){
        super(bordesTablero, elemento);

        this.velActual = 0;
        this.velocidad = velocidad;
        this.keyCodeArriba = keyCodeArriba;
        this.keyCodeAbajo = keyCodeAbajo;
        document.addEventListener("keydown", this.IniciarMovimento.bind(this));
        document.addEventListener("keyup", this.FinalizarMovimento.bind(this))
    }
    
    IniciarMovimento(evento){
if(evento.key == this.keyCodeArriba){
    this.velActual = this.velocidad;

}else if(evento.key == this.keyCodeAbajo) {
    this.velActual = -this.velocidad;
}
    }

    FinalizarMovimento(evento){
        if(evento.key == this.keyCodeArriba ||
             evento.key == this.keyCodeAbajo){
            this.velActual = 0;
        }
    }

    mover(){
        this.y += this.velActual;
        if(this.y + this.alto/2 > this.bordesTablero.maxY)
             this.y = this.bordesTablero.maxY- this.alto/2;
        if(this.y - this.alto/2 < this.bordesTablero.minY)
            this.y = this.alto/2;
        this.elemento.style.bottom = this.y+"px";
        
    }

    comprobarChoque(bordes2){
        var bordes1 = this.getBordes();
        return !(bordes1.maxX < bordes2.minX ||
            bordes1.minX > bordes2.maxX ||
            bordes1.maxY < bordes2.minY ||
            bordes1.minY > bordes2.maxY
        );

    }

}

class marcador{
    constructor(elemento){
        this.elemento = elemento;
        this.pontos = 0;
    }

    ganharPontos(){
        this.pontos++;
        this.elemento.innerHTML = ""+this.pontos;

    }
}

//Inicio Do Jogo

var bordesTablero = new bordes(0, 800, 0, 600);
var dir = Math.random() *2 * Math.PI;
var bola = new Bola(bordesTablero, document.querySelector(".bola"), 6,
 Math.cos(dir), Math.sin(dir));
var pala1 = new pala (bordesTablero, document.querySelector(".pala1"),
 7, "w", "s");
var pala2 = new pala (bordesTablero, document.querySelector(".pala2"),
 7, "ArrowUp", "ArrowDown");
 var marcador1 = new marcador(document.querySelector(".marcador1"));
 var marcador2 = new marcador(document.querySelector(".marcador2"));

 function Update(){
    bola.mover();
    pala1.mover();
    pala2.mover();
    comprobarPalazo();
    verificarGol();
 }

 function comprobarPalazo(){
    if(pala1.comprobarChoque(bola.getBordes())){
        if(bola.dirX < 0) bola.rebotarX();

    }else if(pala2.comprobarChoque(bola.getBordes())){
        if(bola.dirX > 0) bola.rebotarX();
    }
 }

 function verificarGol(){
    var resultado = bola.verificarGol();
    if(resultado != 0){
        if(resultado == 1){
            marcador1.ganharPontos();
        }else if(resultado == 2){
            marcador2.ganharPontos();
        }

        var dir = Math.random() * 2 * Math.PI;
        bola.resetear(400, 300, Math.cos(dir), Math.sin(dir));
    }
 }

 function tick(){
    Update();
    requestAnimationFrame(tick);
 }

 requestAnimationFrame(tick);