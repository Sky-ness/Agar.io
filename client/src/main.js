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
document.querySelector('.characterForm').style.display = 'none';
document.querySelector('.replay').style.display = 'none';
document.querySelector('.scoreBoard').style.display = 'none';

const button = document.querySelector('.characterForm button');
const pseudo = document.querySelector('.characterForm .pseudo');
const color = document.querySelector('.characterForm .color');
button.addEventListener('click', event => {
	event.preventDefault();
	socket.emit('pseudo', pseudo.value);
});
//-------------------------------------------------------------------------------

requestAnimationFrame(render);
function render() {
	socket.on('foods', foods =>
		foods.forEach(element => {
			drawCircle(element, 'green');
		})
	);
	socket.on('players', players =>
		players.forEach(element => {
			drawCircle(element, color.value);
		})
	);
	socket.on('deconnexion', () =>
		context.clearRect(0, 0, canvas.width, canvas.height)
	);
	// context.clearRect(0, 0, canvas.width, canvas.height);
	requestAnimationFrame(render);
}

function drawCircle(circle, color) {
	context.beginPath();
	context.fillStyle = '' + color;
	context.lineWidth = 5;
	context.arc(circle.x, circle.y, circle.score, 0, 360, false);
	context.stroke();
	context.fill();
}
