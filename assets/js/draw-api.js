/** @type {HTMLCanvasElement} */ //Habilitando autocompletado para el canvas
const main = document.querySelector('main');
const canvas = document.querySelector('#main-canvas'); //Canvas
const context = canvas.getContext('2d');                    //Contexto en 2D
const dialog = document.querySelector('dialog');
const cardColor = document.querySelector('.color');
const cardSize = document.querySelector('.size');
const inputColor = document.querySelector('#input-color');
const inputSize = document.querySelector('#input-size');
const btnColor = document.querySelector('#color');
const btnPoint = document.querySelector('#point');
const btnErase = document.querySelector('#erase');
const btnApply = document.querySelector('#apply');

//Coordenadas el mouses iniciales
let iX, iY; //abreviacion de initialX, etc.
let color = '#000'; //Color del trazo por defecto
let size = 10; //Grosor del trazo por defecto

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
const draw = (cursorX, cursorY) =>{

  context.beginPath();                            // Nueva ruta
  context.moveTo(iX, iY);               // Inicia desde x, y del mouse
  context.strokeStyle = color;                  // Establece el color del contorno
  context.lineWidth = size;                         // Establece el grosor de la linea
  context.lineCap='round';                        // Establece el borde redondeado
  context.lineJoin='round';                       // Establece la terminación redondeado
  context.lineTo(cursorX, cursorY);               // Hasta x, y del mouse
  context.stroke();                               // Dibuja el trazo

  iX = cursorX;                                   //Establecer nueva posición
  iY = cursorY;
}

//Obtener posición del mouse
const mouseClick = (evt) => {
  
  iX = evt.offsetX;                             //Obteniendo la posición en X
  iY = evt.offsetY;                             //Obteniendo la posición en Y

  draw(iX, iY);
  canvas.addEventListener('mousemove', mouseMoving);         //Al hacer click, agregar el evento de mousemove para trazar mientras se mueve el mouse
}

//Trazar mientras de mueva el mouse
const mouseMoving = (evt) => {
  draw(evt.offsetX, evt.offsetY);             //Dibujar en las posiciones actuales del mouse mientra se mueva
}

//Quitar el evento de mousemove cuando deje de hacer click
const mouseUp = () => {
  canvas.removeEventListener('mousemove', mouseMoving);    //Remueve el evento mousemove
}

//Eventos para click y al soltar el click del mouse
canvas.addEventListener('mousedown', mouseClick);
canvas.addEventListener('mouseup', mouseUp);

//Acciones de los botones de la barra de herramientas
//Mostrar el dialogo correspondiente a una tarjeta (Color o Size)
const showDialog = (card) => {
  dialog.showModal();
  card.style.display = 'flex'
}

//Cambiar el color
const changeColor = () => {
  color = inputColor.value;
}

//Cambiar el tamaño
const changeSize = () => {
  size = inputSize.value
}

const eraseLine = () => {
}

//Aplicar cambios
const applyChange = () => {
  dialog.close();
  cardColor.style.display = 'none'
  cardSize.style.display = 'none'
}

// Eventos de click para los botones de loa barra de herramientas
btnColor.addEventListener('click', ()=>{showDialog(cardColor)});
btnPoint.addEventListener('click', ()=>{showDialog(cardSize)});
btnErase.addEventListener('click', eraseLine);
btnApply.addEventListener('click', applyChange);
inputColor.addEventListener('mousedown', changeColor);
inputSize.addEventListener('mousedown', changeSize);


