import { io } from 'socket.io-client';

//              initialisation du contexte et canvas
const canvas = document.querySelector('.gameCanvas'),
	context = canvas.getContext('2d');

//TODO faire le canva a la taille de la fenetre
//                   initialisation du serveur
const socket = io();

//                   resize du canvas
function resampleCanvas() {
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
}
const canvasResizeObserver = new ResizeObserver(() => resampleCanvas());
canvasResizeObserver.observe(canvas);

const colorPicker = document.querySelector('.colorFill');

//              générer les points aléatoirement

requestAnimationFrame(render);

function render() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	socket.on('foods', foods =>
		foods.forEach(element => {
			drawCircle(element, 'vert');
		})
	);
	socket.on('players', players =>
		players.forEach(element => {
			drawCircle(element, colorPicker.value);
		})
	);
	requestAnimationFrame(render);
}

function drawCircle(circle, color) {
	this.context.beginPath();
	this.context.fillStyle = '' + color;
	this.context.lineWidth = 5;
	this.context.arc(circle.x, circle.y, circle.score, 0, 360, false);
	this.context.stroke();
	this.context.fill();
}

//                		déplacement

// document.addEventListener('keydown', e => player.moveCircle(e.key));

// let grow = 30;
// let canvasPos = getPosition(canvas);
// let mouseX = 0;
// let mouseY = 0;

// let sqSize = 0;
// let xPos = 0;
// let yPos = 0;
// let dX = 0;
// let dY = 0;

// canvas.addEventListener('mousemove', setMousePosition, false);

// function setMousePosition(e) {
// 	mouseX = e.clientX - canvasPos.x;
// 	mouseY = e.clientY - canvasPos.y;
// }

// function animate() {
// 	dX = mouseX - xPos;
// 	dY = mouseY - yPos;

// 	xPos += dX / 10;
// 	yPos += dY / 10;

// 	player.drawPlayer('red', xPos - sqSize / 2, yPos - sqSize / 2, grow);

// 	requestAnimationFrame(animate);
// }
// animate();

// // deal with the page getting resized or scrolled
// window.addEventListener('scroll', updatePosition, false);
// window.addEventListener('resize', updatePosition, false);

// function updatePosition() {
// 	canvasPos = getPosition(canvas);
// }

// // Helper function to get an element's exact position
// function getPosition(el) {
// 	let xPos = 0;
// 	let yPos = 0;

// 	while (el) {
// 		if (el.tagName == 'BODY') {
// 			// deal with browser quirks with body/window/document and page scroll
// 			let xScroll = el.scrollLeft || document.documentElement.scrollLeft;
// 			let yScroll = el.scrollTop || document.documentElement.scrollTop;

// 			xPos += el.offsetLeft - xScroll + el.clientLeft;
// 			yPos += el.offsetTop - yScroll + el.clientTop;
// 		} else {
// 			// for all other non-BODY elements
// 			xPos += el.offsetLeft - el.scrollLeft + el.clientLeft;
// 			yPos += el.offsetTop - el.scrollTop + el.clientTop;
// 		}

// 		el = el.offsetParent;
// 	}
// 	return {
// 		x: xPos,
// 		y: yPos,
// 	};
// }
