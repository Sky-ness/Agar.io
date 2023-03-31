import { io } from 'socket.io-client';
//import { resolveModuleName } from 'typescript';
import { Maps } from '../../server/class/Maps.js';

//              initialisation du contexte et canvas
const canvas = document.querySelector('.gameCanvas'),
	context = canvas.getContext('2d');

//TODO faire le canva a la taille de la fenetre
//                   initialisation du serveur coté client
const socket = io();
let scale = 2;
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
	context.scale(scale, scale);
	context.save();
});

function taille() {
	context.restore();
	scale -= 0.01;
	context.scale(scale, scale);
	context.save();
}

//-------------------------------------------------------------------------------
let mapC = new Maps(),
	mouse = { x: 0, y: 0 };

const scoreBoard = document.querySelector('.scoreBoard');

socket.on('map', mapS => {
	mapC = mapS;
});

socket.on('eatFood', () => {
	taille();
	console.log('scale');
});

socket.on('deconnexion', () =>
	context.clearRect(0, 0, canvas.width, canvas.height)
);
canvas.addEventListener('mousemove', event => setMousePosition(event));

let test;
function setMousePosition(event) {
	const rect = canvas.getBoundingClientRect();
	mouse = {
		x: (event.clientX - rect.left) / scale,
		y: (event.clientY - rect.top) / scale,
	};
}

requestAnimationFrame(render);

function render() {
	socket.emit('mousePosition', mouse);
	showScoreBoard(scoreBoard);
	drawMap(mapC);

	requestAnimationFrame(render);
}

function setMousePosition(event) {
	const rect = canvas.getBoundingClientRect();
	mouse = { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

function drawCircle(circle, color, pseudo) {
	context.beginPath();
	context.fillStyle = '' + color;
	context.lineWidth = 4;
	context.arc(circle.x, circle.y, circle.score, 0, 360, false);
	context.fill();
	context.fillStyle = 'white';
	if (pseudo != null) {
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.font = circle.score / 3 + 'px comic sans ms';
		context.fillText(pseudo, circle.x, circle.y);
	}
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

function updateZoom(player) {
	/*TODO*/
}

function drawMap(mapC) {
	context.clearRect(0, 0, canvas.width, canvas.height);
	grid(70);
	mapC.foods.forEach(element => {
		drawCircle(element, element.color, null);
	});
	mapC.players.forEach(element => {
		drawCircle(element, element.color, element.pseudo);
	});
}
function showScoreBoard(scoreBoard) {
	scoreBoard.innerHTML = '';
	for (let i = mapC.players.length - 1; i >= 0; i--) {
		scoreBoard.innerHTML += `<li>${mapC.players[i].pseudo} : ${mapC.players[i].score}</li>`;
	}
}

//-----------------------------------------------------
