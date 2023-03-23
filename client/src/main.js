import { io } from 'socket.io-client';
import CharacterView from './view/characterView.js';
import ScoreBoardView from './view/ScoreBoardView.js';
import ReplayView from './view/replayView.js';
import PlayView from './view/PlayView.js';
//              initialisation du contexte et canvas
const canvas = document.querySelector('.gameCanvas'),
	context = canvas.getContext('2d');

//TODO faire le canva a la taille de la fenetre
//                   initialisation du serveur coté client
const socket = io();

//                   resize du canvas
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

let selectedColor = 'red';
colorPicker.addEventListener('change', function () {
	selectedColor = colorPicker.value;
});

button.addEventListener('click', event => {
	event.preventDefault();
	socket.emit('play');
	document.querySelector('.characterForm').style.display = 'none';
	// document.querySelector('.scoreBoard').style.display = 'block';
});

// 						scoreBoard
const scoreBoard = document.querySelector('.scoreBoard');
socket.on('players', players => {
	scoreBoard.innerHTML = '<tr><th>pseudo</th><th>score</th></tr>';
	players.forEach(player => {
		scoreBoard.innerHTML += `<tr><td>${player.pseudo}</td><td>${player.score}</td></tr>`;
	});
});
//-------------------------------------------------------------------------------

requestAnimationFrame(render);
function render() {
	socket.on('foods', foods =>
		foods.forEach(element => {
			drawCircle(element, 'green', pseudo);
		})
	);
	socket.on('players', players =>
		players.forEach(element => {
			drawCircle(element, selectedColor, pseudo);
		})
	);
	socket.on('deconnexion', () =>
		context.clearRect(0, 0, canvas.width, canvas.height)
	);
	// context.clearRect(0, 0, canvas.width, canvas.height);
	requestAnimationFrame(render);
}

function drawCircle(circle, color /*pseudo*/) {
	context.beginPath();
	context.fillStyle = '' + color;
	context.lineWidth = 5;
	context.arc(circle.x, circle.y, circle.score, 0, 360, false);
	// context.font = '10px Arial';
	// context.fillStyle = 'black';
	// context.fillText(pseudo, 100, 110);
	context.stroke();
	context.fill();
}
