class bordes {

    constructor(minX, maxX, minY, maxY) {

        this.minX = minX;
        this.maxX = maxX;

        this.minY = minY;
        this.maxY = maxY;

    }

}

class objetoMovil {

    constructor(bordesTablero, elemento) {

        this.bordesTablero = bordesTablero;

        this.x = parseInt(getComputedStyle(elemento).left);
        this.y = parseInt(getComputedStyle(elemento).bottom);

        this.ancho = parseInt(getComputedStyle(elemento).width);
        this.alto = parseInt(getComputedStyle(elemento).height);

        this.elemento = elemento;

    }

    getBordes() {

        return new bordes(

            this.x - this.ancho / 2,
            this.x + this.ancho / 2,

            this.y - this.alto / 2,
            this.y + this.alto / 2

        );

    }

    resetear() {

        this.ancho = parseInt(getComputedStyle(this.elemento).width);
        this.alto = parseInt(getComputedStyle(this.elemento).height);

    }

}

class Bola extends objetoMovil {

    constructor(bordesTablero, elemento, velocidad, dirX, dirY) {

        super(bordesTablero, elemento);

        this.velocidad = velocidad;

        this.dirX = dirX;
        this.dirY = dirY;

    }

    mover() {

        if (!juegoActivo) return;

        this.x += this.dirX * this.velocidad;
        this.y += this.dirY * this.velocidad;

        this.elemento.style.left = this.x + "px";
        this.elemento.style.bottom = this.y + "px";

        this.verificarRebote();

    }

    verificarRebote() {

        if (

            this.y + this.alto / 2 > this.bordesTablero.maxY ||
            this.y - this.alto / 2 < this.bordesTablero.minY

        ) {

            this.rebotarY();

        }

    }

    rebotarX() {

        this.dirX = -this.dirX;

    }

    rebotarY() {

        this.dirY = -this.dirY;

    }

    verificarGol() {

        if (this.x - this.ancho / 2 < this.bordesTablero.minX) {

            return 2;

        }

        else if (this.x + this.ancho / 2 > this.bordesTablero.maxX) {

            return 1;

        }

        return 0;

    }

    resetear(x, y, dirX, dirY) {

        this.x = x;
        this.y = y;

        this.dirX = dirX;
        this.dirY = dirY;

        this.elemento.style.left = this.x + "px";
        this.elemento.style.bottom = this.y + "px";

    }

}

class pala extends objetoMovil {

    constructor(
        bordesTablero,
        elemento,
        velocidad,
        keyCodeArriba,
        keyCodeAbajo
    ) {

        super(bordesTablero, elemento);

        this.velActual = 0;

        this.velocidad = velocidad;

        this.keyCodeArriba = keyCodeArriba;
        this.keyCodeAbajo = keyCodeAbajo;

        document.addEventListener(
            "keydown",
            this.IniciarMovimento.bind(this)
        );

        document.addEventListener(
            "keyup",
            this.FinalizarMovimento.bind(this)
        );

    }

    IniciarMovimento(evento) {

        if (evento.key == this.keyCodeArriba) {

            this.velActual = this.velocidad;

        }

        else if (evento.key == this.keyCodeAbajo) {

            this.velActual = -this.velocidad;

        }

    }

    FinalizarMovimento(evento) {

        if (

            evento.key == this.keyCodeArriba ||
            evento.key == this.keyCodeAbajo

        ) {

            this.velActual = 0;

        }

    }

    mover() {

        this.y += this.velActual;

        if (this.y + this.alto / 2 > this.bordesTablero.maxY)
            this.y = this.bordesTablero.maxY - this.alto / 2;

        if (this.y - this.alto / 2 < this.bordesTablero.minY)
            this.y = this.alto / 2;

        this.elemento.style.bottom = this.y + "px";

    }

    comprobarChoque(bordes2) {

        var bordes1 = this.getBordes();

        return !(

            bordes1.maxX < bordes2.minX ||
            bordes1.minX > bordes2.maxX ||

            bordes1.maxY < bordes2.minY ||
            bordes1.minY > bordes2.maxY

        );

    }

}

class marcador {

    constructor(elemento) {

        this.elemento = elemento;

        this.pontos = 0;

    }

    ganharPontos() {

        this.pontos++;

        this.elemento.innerHTML = "" + this.pontos;

    }

}

// INICIO DEL JUEGO

var bordesTablero = new bordes(0, 800, 0, 600);

var velocidadInicial = 6;

var juegoActivo = false;
var juegoTerminado = false;

// PERSONAJES

var personaje1 = document.querySelector(".personaje1");
var personaje2 = document.querySelector(".personaje2");

// DIRECCIÓN INICIAL

var dirXInicial =
    Math.random() < 0.5 ? -1 : 1;

var dirYInicial =
    (Math.random() * 1.2) - 0.6;

// BOLA

var bola = new Bola(

    bordesTablero,

    document.querySelector(".bola"),

    velocidadInicial,

    dirXInicial,
    dirYInicial

);

// PALAS

var pala1 = new pala(

    bordesTablero,

    document.querySelector(".pala1"),

    7,

    "w",
    "s"

);

var pala2 = new pala(

    bordesTablero,

    document.querySelector(".pala2"),

    7,

    "ArrowUp",
    "ArrowDown"

);

// MARCADORES

var marcador1 =
    new marcador(document.querySelector(".marcador1"));

var marcador2 =
    new marcador(document.querySelector(".marcador2"));

// PERSONAJES SIGUEN PALAS

function actualizarPersonajes() {

    personaje1.style.bottom =
        (pala1.y - 45) + "px";

    personaje2.style.bottom =
        (pala2.y - 45) + "px";

}

// ANIMACIÓN PERSONAJES

function animarPersonaje(personaje, lado) {

    var frame = 1;

    var intervalo = setInterval(() => {

        // IZQUIERDA

        if (lado == 1) {

            personaje.style.backgroundImage =
                `url("personaje${frame}.png")`;

        }

        // DERECHA

        else {

            personaje.style.backgroundImage =
                `url("2personaje${frame}.png")`;

        }

        frame++;

        // TERMINAR

        if (frame > 4) {

            clearInterval(intervalo);

            // VOLVER A IDLE

            if (lado == 1) {

                personaje.style.backgroundImage =
                    `url("personaje1.png")`;

            }

            else {

                personaje.style.backgroundImage =
                    `url("2personaje1.png")`;

            }

        }

    }, 50);

}

// UPDATE

function Update() {

    bola.mover();

    pala1.mover();
    pala2.mover();

    actualizarPersonajes();

    comprobarPalazo();

    verificarGol();

}

// CHOQUES

function comprobarPalazo() {

    // IZQUIERDA

    if (pala1.comprobarChoque(bola.getBordes())) {

        if (bola.dirX < 0) {

            bola.rebotarX();

            // ANIMACIÓN

            animarPersonaje(personaje1, 1);

            // EFECTO MOVIMIENTO

            bola.dirY += pala1.velActual * 0.03;

            // VELOCIDAD BOLA

            bola.velocidad += 0.20;

            // VELOCIDAD PALAS

            pala1.velocidad += 0.10;
            pala2.velocidad += 0.10;

        }

    }

    // DERECHA

    else if (pala2.comprobarChoque(bola.getBordes())) {

        if (bola.dirX > 0) {

            bola.rebotarX();

            // ANIMACIÓN

            animarPersonaje(personaje2, 2);

            // EFECTO MOVIMIENTO

            bola.dirY += pala2.velActual * 0.03;

            // VELOCIDAD BOLA

            bola.velocidad += 0.20;

            // VELOCIDAD PALAS

            pala1.velocidad += 0.10;
            pala2.velocidad += 0.10;

        }

    }

}


// GOLES

function verificarGol() {

    if (!juegoActivo) return;

    var resultado = bola.verificarGol();

    if (resultado != 0) {

        // PUNTOS

        if (resultado == 1) {

            marcador1.ganharPontos();

        }

        else if (resultado == 2) {

            marcador2.ganharPontos();

        }

        // REINICIAR VELOCIDADES

        bola.velocidad = velocidadInicial;

        pala1.velocidad = 7;
        pala2.velocidad = 7;

        // GANADOR

        if (

            marcador1.pontos >= 5 ||
            marcador2.pontos >= 5

        ) {

            juegoActivo = false;

            juegoTerminado = true;

            var ganador =

                marcador1.pontos >= 5
                    ? "Jugador 1"
                    : "Jugador 2";

            alert("Fin del juego. Ganó " + ganador);

            bola.resetear(400, 300, 0, 0);

            return;

        }

        // NUEVA DIRECCIÓN

        var nuevoDirX =
            Math.random() < 0.5 ? -1 : 1;

        var nuevoDirY =
            (Math.random() * 1.2) - 0.6;

        bola.resetear(

            400,
            300,

            nuevoDirX,
            nuevoDirY

        );

    }

}

// BOTÓN
function comezarJogo() {

    marcador1.pontos = 0;
    marcador2.pontos = 0;

    marcador1.elemento.innerHTML = "0";
    marcador2.elemento.innerHTML = "0";

    var nuevoDirX =
        Math.random() < 0.5 ? -1 : 1;

    var nuevoDirY =
        (Math.random() * 1.2) - 0.6;

    bola.resetear(

        400,
        300,

        nuevoDirX,
        nuevoDirY

    );
    // REINICIAR VELOCIDADES

    bola.velocidad = velocidadInicial;

    pala1.velocidad = 7;
    pala2.velocidad = 7;

    juegoActivo = true;
    juegoTerminado = false;

}

// GAME LOOP

function tick() {

    Update();

    requestAnimationFrame(tick);

}

requestAnimationFrame(tick);