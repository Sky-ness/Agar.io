import { Maps } from '../../../server/class/Maps.js';
// @ts-ignore
import { randomColor } from '../../../server/function/random.ts';
// @ts-ignore
import { socket } from '../main.ts';
import {Player} from '../../../server/class/Player.js'


const canvas = document.querySelector('.gameCanvas') as HTMLCanvasElement;

const context = canvas.getContext('2d') as CanvasRenderingContext2D,
	canvasResizeObserver = new ResizeObserver(() => resampleCanvas()),
	dragon = new Image(),
	fire = new Image(),
	cgt = new Image();
let mouse: {x: number,y:number};
let zoom = 3;
let originX = 0;
let originY = 0;

dragon.src = '/images/logo.png';
fire.src = '/images/fire.png';
cgt.src = '/images/cgt.png';
canvasResizeObserver.observe(canvas);
canvas.addEventListener('mousemove', event => {
	setMousePosition(event);
	socket.emit('mousePosition', mouse);
});

export function drawGame(mapC: Maps, scoreBoard: HTMLOListElement, id: string) {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.save();

	context.scale(zoom, zoom);
	//--------------------------bordel-------------------------------------------

	if (mapC.players.find(el => el.id === id)) {
		translate(mapC.players.find(el => el.id === id)!);
	}
	//---------------------------------------------------------------------------
	grid(70, mapC);
	mapC.foods.forEach(element => {
		drawCircle(element, element.color, '');
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

export function updateZoom(scoreDIff: number) {
	if (zoom > 0.8) {
		zoom -= 0.01 * scoreDIff;
		
	}
}

export function resetZoom() {
	zoom = 3;
}

function drawCircle(circle: any, color: string, pseudo: string) {
	context.beginPath();
	context.fillStyle = '' + color;
	context.lineWidth = 4;
	context.arc(circle.x, circle.y, circle.score, 0, 360, false);
	context.fill();
	context.fillStyle = 'white';
	if (pseudo != null && pseudo != 'fritsch') {
		context.drawImage(
			dragon,
			circle.x - circle.score / 2,
			circle.y - circle.score / 2,
			circle.score,
			circle.score
		);
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.font = circle.score / 3 + 'px comic sans ms';
		context.fillText(pseudo, circle.x, circle.y);
	} else if (pseudo === 'fritsch') {
		context.drawImage(
			cgt,
			circle.x - circle.score / 2,
			circle.y - circle.score / 2,
			circle.score,
			circle.score
		);
	} else {
		context.drawImage(
			fire,
			circle.x - circle.score / 2,
			circle.y - circle.score / 2,
			circle.score,
			circle.score
		);
	}
}

function grid(size: number, mapC: Maps) {
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

function showScoreBoard(mapC: Maps, scoreBoard: HTMLOListElement) {
	scoreBoard.innerHTML = '';
	for (let i = mapC.players.length - 1; i >= 0; i--) {
		scoreBoard.innerHTML += `<li>${mapC.players[i].pseudo} : ${mapC.players[i].score}</li>`;
	}
}

function resampleCanvas() {
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
}

function translate(player: Player) {
	originX = canvas.width / 2 / zoom - player.x;
	originY = canvas.height / 2 / zoom - player.y;
	context.translate(originX, originY);
}

function setMousePosition(event: MouseEvent) {
	const rect = canvas.getBoundingClientRect();
	mouse = {
		x: event.clientX / zoom - rect.left - originX,
		y: event.clientY / zoom - rect.top - originY,
	};
}
