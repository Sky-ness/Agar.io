import { io } from 'socket.io-client';
//import { resolveModuleName } from 'typescript';
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

let mouse = { x: 0, y: 0 };

socket.on('map', mapS => {
	mapC = mapS;
});

socket.on('deconnexion', () =>
	context.clearRect(0, 0, canvas.width, canvas.height)
);
canvas.addEventListener('mousemove', event => setMousePosition(event));

let test;
function setMousePosition(event) {
	const rect = canvas.getBoundingClientRect();
	mouse = { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

requestAnimationFrame(render);
function render() {
	context.save();
	context.clearRect(0, 0, canvas.width, canvas.height);
	grid(70);
	scoreBoard.innerHTML = '';
	socket.emit('mousePosition', mouse);
	for (let i = mapC.players.length - 1; i >= 0; i--) {
		scoreBoard.innerHTML += `<li>${mapC.players[i].pseudo} : ${mapC.players[i].score}</li>`;
	}
	mapC.foods.forEach(element => {
		drawCircle(element, element.color);
	});
	mapC.players.forEach(element => {
		drawCircle(element, element.color);
	});
	if ((test = mapC.players.find(el => el.id == socket.id) != null)) {
		test = mapC.players.find(el => el.id == socket.id);
		context.translate(canvas.width / 2 / test.x, canvas.height / 2 / test.y);
	}
	context.restore();

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
