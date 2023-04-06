import { randomColor } from '../../../server/function/random.js';
import { socket } from '../main.js';

const canvas = document.querySelector('.gameCanvas');

const context = canvas.getContext('2d'),
	canvasResizeObserver = new ResizeObserver(() => resampleCanvas());

let mouse;
let zoom = 2;
let originX = 0;
let originY = 0;
let ancienScore = 20;

canvasResizeObserver.observe(canvas);
canvas.addEventListener('mousemove', event => {
	setMousePosition(event);
	socket.emit('mousePosition', mouse);
});

export function drawGame(mapC, scoreBoard, id) {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.save();
	mainZoom();
	//--------------------------bordel-------------------------------------------
	if (mapC.players.find(el => el.id === id)) {
		translate(mapC.players.find(el => el.id === id));
		if (mapC.players.find(el => el.id === id).score != ancienScore) {
			updateZoom(mapC.players.find(el => el.id === id).score - ancienScore);
			ancienScore = mapC.players.find(el => el.id === id).score;
		}
	}
	//---------------------------------------------------------------------------
	grid(70, mapC);
	mapC.foods.forEach(element => {
		drawCircle(element, element.color, null);
	});
	mapC.players.forEach(element => {
		if (!element.isFeedable) {
			drawCircle(element, randomColor(), element.pseudo);
		} else {
			drawCircle(element, element.color, element.pseudo);
		}
	});
	showScoreBoard(mapC, scoreBoard);
	context.restore();
}

function mainZoom() {
	context.scale(zoom, zoom);
}
export function updateZoom(scoreDIff) {
	zoom -= 0.01 * scoreDIff;
}

export function resetZoom() {
	zoom = 2;
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

function grid(size, mapC) {
	context.lineWidth = 2;
	for (var x = 0; x <= mapC.width; x += size) {
		context.moveTo(x, 0);
		context.lineTo(x, mapC.height);
	}
	for (var y = 0; y <= mapC.height; y += size) {
		context.moveTo(0, y);
		context.lineTo(mapC.width, y);
	}
	context.strokeStyle = 'rgba(204, 204, 204, 0.3)';
	context.stroke();
}

function showScoreBoard(mapC, scoreBoard) {
	scoreBoard.innerHTML = '';
	for (let i = mapC.players.length - 1; i >= 0; i--) {
		scoreBoard.innerHTML += `<li>${mapC.players[i].pseudo} : ${mapC.players[i].score}</li>`;
	}
}

function resampleCanvas() {
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
}

function translate(player) {
	originX = canvas.width / 2 / zoom - player.x;
	originY = canvas.height / 2 / zoom - player.y;
	context.translate(originX, originY);
}

function setMousePosition(event) {
	const rect = canvas.getBoundingClientRect();
	mouse = {
		x: event.clientX / zoom - rect.left - originX,
		y: event.clientY / zoom - rect.top - originY,
	};
}
