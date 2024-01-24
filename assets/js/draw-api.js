/** @type {HTMLCanvasElement} */ //Habilitando autocompletado para el canvas
const main = document.querySelector('main');
const canvas = document.querySelector('#main-canvas'); //Canvas
const context = canvas.getContext('2d');                    //Contexto en 2D
//const btn

//Coordenadas el mouses iniciales
let iX, iY; //abreviacion de initialX, etc.

//Función callback para redimencionar el canvas cada 200ms con respecto al tamaño del main
const resize = (func) => {
    let timer;
    return (event) => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(func, 200, event);
    }
}

//Evento de redimensionar
window.addEventListener('resize', resize(() => { 
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}));

//Funciones flecha que usa eventos como parámetro
//Dibujar

const draw = (evt) =>{
    context.beginPath(); // Nueva ruta
    context.arc(evt.x, evt.y, 10, 0, 2 * Math.PI); // Dibuja un círculo completo
    context.strokeStyle = 'green'; // Establece el color del contorno
    context.lineCap='round';
    context.lineJoin='round';
    context.stroke(); // Dibuja el contorno del círculo
    context.fillStyle = 'green'; // Establece el color de relleno
    context.fill(); // Rellena el círculo
}

canvas.addEventListener('click', draw);
