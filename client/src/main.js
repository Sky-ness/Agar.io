import { io } from 'socket.io-client';
import { Maps } from '../../server/class/Maps.js';
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

//-------------------------------------------------------------------------------
let mapC = new Maps();

const scoreBoard = document.querySelector('.scoreBoard');

socket.on('map', mapS => {
	mapC = mapS;
});

socket.on('deconnexion', () =>
	context.clearRect(0, 0, canvas.width, canvas.height)
);

let mouse = { x: 0, y: 0 };
let canvasPos = getPosition(canvas);

function setMousePosition(e) {
	mouse = { x: e.clientX - canvasPos.x, y: e.clientY - canvasPos.y, id: socket.id };
}

canvas.addEventListener('mousemove', event => setMousePosition(event));

requestAnimationFrame(render);

function render() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	scoreBoard.innerHTML = '<tr><th>pseudo</th><th>score</th></tr>';
	// console.log(mapC);
	socket.emit('mousePosition', mouse);
	for (let i = mapC.players.length - 1; i >= 0; i--) {
		scoreBoard.innerHTML += `<tr><td>${mapC.players[i].pseudo}</td><td>${mapC.players[i].score}</td></tr>`;
	}
	mapC.foods.forEach(element => {
		drawCircle(element, 'green');
	});
	mapC.players.forEach(element => {
		drawCircle(element, selectedColor);
	});
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
	context.fill();
	context.stroke();
}

function getPosition(canva) {
	let xPos = 0;
	let yPos = 0;

	while (canva) {
		if (canva.tagName == 'BODY') {
			// deal with browser quirks with body/window/document and page scroll
			let xScroll = canva.scrollLeft || document.documentElement.scrollLeft;
			let yScroll = canva.scrollTop || document.documentElement.scrollTop;

			xPos += canva.offsetLeft - xScroll + canva.clientLeft;
			yPos += canva.offsetTop - yScroll + canva.clientTop;
		} else {
			// for all other non-BODY elements
			xPos += canva.offsetLeft - canva.scrollLeft + canva.clientLeft;
			yPos += canva.offsetTop - canva.scrollTop + canva.clientTop;
		}
		canva = canva.offsetParent;
	}
	return {
		x: xPos,
		y: yPos,
	};
}

//-----------------------------------------------------
