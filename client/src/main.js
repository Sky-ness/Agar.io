import { io } from 'socket.io-client';

//              initialisation du contexte et canvas
const canvas = document.querySelector('.gameCanvas'),
	context = canvas.getContext('2d');

//TODO faire le canva a la taille de la fenetre
//                   initialisation du serveur coté client
const socket = io();

//                   resize du canvas
function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// 							generate view
// const characterView = new CharacterView(document.querySelector('.characterForm'));
// const scoreBoardView = new ScoreBoardView(document.querySelector('.scoreBoard'));
// const replayView = new ReplayView(document.querySelector('.replay'));

//			temporaire le temps que les vues ne fonctionne pas encore
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
	// context.clearRect(0, 0, canvas.width, canvas.height);
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
	socket.on('deconnexion', players => {
		context.clearRect(0, 0, canvas.width, canvas.height);
	});
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
