import { io } from 'socket.io-client';

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

requestAnimationFrame(render);
function render() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	scoreBoard.innerHTML = '<tr><th>pseudo</th><th>score</th></tr>';
	console.log(mapC);
	mapC.players.forEach(player => {
		scoreBoard.innerHTML += `<tr><td>${player.pseudo}</td><td>${player.score}</td></tr>`;
	});
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

//-----------------------------------------------------

// Les mouvements meme si ils sont guèze pour le moment

let joueurs = [];

let food = [];

socket.on('foods', foods => {
	foods.forEach(element => {
		food.push(element);
	});
});

let grow = 30;
let canvasPos = getPosition(canvas);
let mouseX = 0;
let mouseY = 0;
let sqSize = 0;
let xPos = 0;
let yPos = 0;
let dX = 0;
let dY = 0;

function eatFood(food, player) {
	let rayJ = player.score;
	let rayF = food.score;
	let a = player.score + food.score;
	let x = player.x - food.x;
	let y = player.y - food.y;

	if (rayJ > Math.sqrt(x * x + y * y) + rayF) {
		player.score += 2;
		return true;
	} else {
		return false;
	}
}

canvas.addEventListener('mousemove', setMousePosition, false);

function setMousePosition(e) {
	mouseX = e.clientX - canvasPos.x;
	mouseY = e.clientY - canvasPos.y;
	//console.log("X :" + mouseX + " Y : " + mouseY)
}
let speedX = 50;
let speedY = 50;
function animate() {
	socket.on('players', players => {
		joueurs = [];
		players.forEach(element => {
			joueurs.push(element);
		});
	});
	if (mouseX - xPos > 300) {
		speedX = 300;
	} else if (mouseX - xPos < -300) {
		speedX = 300;
	} else if (mouseX - xPos > 100) {
		speedX = 200;
	} else if (mouseX - xPos < -100) {
		speedX = 200;
	} else {
		speedX = 100;
	}
	if (mouseY - yPos > 300) {
		speedY = 300;
	} else if (mouseY - yPos < -300) {
		speedY = 300;
	} else if (mouseY - yPos > 100) {
		speedY = 200;
	} else if (mouseY - yPos < -100) {
		speedY = 200;
	} else {
		speedY = 100;
	}

	dX = mouseX - xPos;
	dY = mouseY - yPos;

	xPos += dX / speedX;
	yPos += dY / speedY;

	context.clearRect(0, 0, canvas.width, canvas.height);
	food.forEach(element => {
		drawCircle(element, 'green');
	});
	joueurs.forEach(element => {
		element.x = xPos - sqSize / 2;
		element.y = yPos - sqSize / 2;
		drawCircle(element, selectedColor);
		food.forEach(el => {
			if (eatFood(el, element)) {
				food = food.filter(food => food != el);
			}
		});
	});
	socket.emit('joueurs', joueurs);

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
