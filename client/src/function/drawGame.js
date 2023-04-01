const canvas = document.querySelector('.gameCanvas'),
	context = canvas.getContext('2d'),
	canvasResizeObserver = new ResizeObserver(() => resampleCanvas());
	//context.transform(1, 0, 0, -1, 0, canvas.height)
let scale = 2;
export let mouse = { x: 0, y: 0 };

canvasResizeObserver.observe(canvas);
canvas.addEventListener('mousemove', event => setMousePosition(event));

export function drawGame(mapC, scoreBoard,id) {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.save();
	if(mapC.players.find(el => el.id === id)){
		translate(mapC.players.find(el => el.id === id))
	}
	grid(70);
	mapC.foods.forEach(element => {
		drawCircle(element, element.color, null);
	});
	mapC.players.forEach(element => {
		drawCircle(element, element.color, element.pseudo);
	});
	showScoreBoard(mapC, scoreBoard);
	context.restore();
}

export function updateScale(player) {
	
	scale -= 0.01;
	//context.scale(scale,scale );
	context.save();
	context.restore();
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

function setMousePosition(event) {
	const rect = canvas.getBoundingClientRect();
	mouse = {
		x: (event.clientX) - rect.left / scale,
		y: event.clientY - rect.top / scale,
	};

}

export function translate(player){
	
	context.translate(  -player.x + (canvas.width/2) ,  - player.y + (canvas.height /2));
	
	
}
