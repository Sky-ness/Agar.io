import { generateRandomNumber } from './function/random.js';
import { Circle } from './class/Circle.js';
import { io } from 'socket.io-client';

//              initialisation du contexte et canvas
const canvas = document.querySelector('.gameCanvas'),
	context = canvas.getContext('2d');
//                   initialisation du serveur
const socket = io();

/*                   resize du canvas 
function resampleCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}
const canvasResizeObserver = new ResizeObserver(() => resampleCanvas());
canvasResizeObserver.observe(canvas);*/

let player = new Circle(
	canvas.width / 2,
	canvas.height / 2,
	50,
	'red',
	context
);
let foods = [];

//              générer les points aléatoirement

generateFood();
requestAnimationFrame(render);
setInterval(player.moveCircle(), 1000 / 60);

function render() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	foods.forEach(circle => circle.drawCircle());
	requestAnimationFrame(render);
}

function generateFood() {
	for (let i = 0; i <= generateRandomNumber(70, 80); i++) {
		foods.push(
			new Circle(
				generateRandomNumber(0, canvas.width),
				generateRandomNumber(0, canvas.height),
				10,
				'green',
				context
			)
		);
	}
}

//                déplacement

document.addEventListener('keydown', e => player.moveCircle(e.key));

let grow = 30;
let canvasPos = getPosition(canvas);
let mouseX = 0;
let mouseY = 0;

let xPos = 0;
let yPos = 0;
let dX = 0;
let dY = 0;

canvas.addEventListener('mousemove', setMousePosition, false);

function setMousePosition(e) {
	mouseX = e.clientX - canvasPos.x;
	mouseY = e.clientY - canvasPos.y;
}

function animate() {
	dX = mouseX - xPos;
	dY = mouseY - yPos;

	xPos += dX / 10;
	yPos += dY / 10;

	player.drawPlayer('red', xPos - sqSize / 2, yPos - sqSize / 2, grow);

	requestAnimationFrame(animate);
}
animate();

// deal with the page getting resized or scrolled
window.addEventListener('scroll', updatePosition, false);
window.addEventListener('resize', updatePosition, false);

function updatePosition() {
	canvasPos = getPosition(canvas);
}

// Helper function to get an element's exact position
function getPosition(el) {
	let xPos = 0;
	let yPos = 0;

	while (el) {
		if (el.tagName == 'BODY') {
			// deal with browser quirks with body/window/document and page scroll
			let xScroll = el.scrollLeft || document.documentElement.scrollLeft;
			let yScroll = el.scrollTop || document.documentElement.scrollTop;

			xPos += el.offsetLeft - xScroll + el.clientLeft;
			yPos += el.offsetTop - yScroll + el.clientTop;
		} else {
			// for all other non-BODY elements
			xPos += el.offsetLeft - el.scrollLeft + el.clientLeft;
			yPos += el.offsetTop - el.scrollTop + el.clientTop;
		}

		el = el.offsetParent;
	}
	return {
		x: xPos,
		y: yPos,
	};
}
