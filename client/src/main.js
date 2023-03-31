import { io } from 'socket.io-client';
import { Maps } from '../../server/class/Maps.js';
//              initialisation du contexte et canvas
const canvas = document.querySelector('.gameCanvas'),
	context = canvas.getContext('2d');

//TODO faire le canva a la taille de la fenetre
//                   initialisation du serveur coté client
const socket = io();

//                   resize du canvas

/* context.translate context.save context.qqch */
const canvasResizeObserver = new ResizeObserver(() => resampleCanvas());
canvasResizeObserver.observe(canvas);

function resampleCanvas() {
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
}

// 							generate view
// const characterView = new CharacterView(document.querySelector('.characterForm'));
// const scoreBoardView = new ScoreBoardView(document.querySelector('.scoreBoard'));
// const replayView = new ReplayView(document.querySelector('.replay'));
// const playView = new PlayView(document.querySelector('.game'));

//			temporaire le temps que les vues ne fonctionne pas encore
//
document.querySelector('.replay').style.display = 'none';
// document.querySelector('.scoreBoard').style.display = 'none';

// 					character chooser
const button = document.querySelector('.characterForm button');
const pseudo = document.querySelector('.characterForm .pseudo');
const colorPicker = document.querySelector('.characterForm .color');

let selectedColor = colorPicker.value;
colorPicker.addEventListener('change', function () {
	selectedColor = colorPicker.value;
});

button.addEventListener('click', event => {
	event.preventDefault();
	socket.emit('pseudo', pseudo.value);
	socket.emit('color', selectedColor);
	socket.emit('play');
	document.querySelector('.character').style.display = 'none';
});

//-------------------------------------------------------------------------------
let mapC = new Maps();

const scoreBoard = document.querySelector('.scoreBoard');

canvas.addEventListener('mousemove', event => setMousePosition(event));

socket.on('map', mapS => {
	mapC = mapS;
});

socket.on('deconnexion', () =>
	context.clearRect(0, 0, canvas.width, canvas.height)
);

let mouse = { x: 0, y: 0, id: socket.id };

function setMousePosition(e) {
	mouse = {
		x: e.clientX,
		y: e.clientY,
		id: socket.id,
	};
}

canvas.addEventListener('mousemove', event => setMousePosition(event));

requestAnimationFrame(render);

function render() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	grid(70);
	scoreBoard.innerHTML = '';
	for (let i = mapC.players.length - 1; i >= 0; i--) {
		scoreBoard.innerHTML += `<li>${mapC.players[i].pseudo} : ${mapC.players[i].score}</li>`;
	}
	socket.emit('mousePosition', mouse);
	mapC.foods.forEach(element => {
		drawCircle(element, element.color);
	});
	mapC.players.forEach(element => {
		drawCircle(element, element.color);
	});
	requestAnimationFrame(render);
}

function drawCircle(circle, color /*pseudo*/) {
	context.beginPath();
	context.fillStyle = '' + color;
	context.lineWidth = 4;
	// context.fillText(pseudo, circle.x, circle.y);
	context.arc(circle.x, circle.y, circle.score, 0, 360, false);
	context.fill();
}

function grid(size) {
	context.lineWidth = 2;
	for (var x = 0; x <= canvas.width; x += size) {
		context.moveTo(x, 0);
		context.lineTo(x, canvas.height);
	}
	for (var y = 0; y <= canvas.height; y += size) {
		context.moveTo(0, y);
		context.lineTo(canvas.width, y);
	}
	context.strokeStyle = 'rgba(204, 204, 204, 0.3)';
	context.stroke();
}
//-----------------------------------------------------
