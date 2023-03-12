import { generateRandomNumber } from './random.js';

//              initialisation du contexte et canvas
const canvas = document.querySelector('.gameCanvas'),
    context = canvas.getContext('2d');

/*                   resize du canvas 
function resampleCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}
const canvasResizeObserver = new ResizeObserver(() => resampleCanvas());
canvasResizeObserver.observe(canvas);*/

// Variable de déplacement
let x = canvas.width/2;
let y = canvas.height/2;
let dx = 10;
let dy = 10;

//                   Avec un canva simple 

requestAnimationFrame(render);
setInterval(moveCircle, 1000/60);

function drawCircle(colorFill,colorLine,x,y,taille){
    context.beginPath();
    context.fillStyle = ''+colorFill;
    context.strokeStyle = ''+colorLine;
    context.lineWidth = 5;
    context.arc(x, y, taille, 0, 360, false);
    context.stroke();
    context.fill();
}
function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawCircle('red','black',x,y,30);
    generateFood();
    requestAnimationFrame(render);
}
//                déplacement avec les fleches
document.addEventListener("keydown", (e)=> moveCircle(e.key));
function moveCircle(direction) {
	if(direction=="ArrowDown"){
		y+=dy;
	}
	if(direction=="ArrowUp"){
		y-=dy;
	}
	if(direction=="ArrowLeft"){
		x-=dx;
	}
	if(direction=="ArrowRight"){
		x+=dx;
	}
}

//              générer les points aléatoirement

function generateFood(){
    for(let i=0;i<= generateRandomNumber(20,40);i++){
        drawCircle('green','black',generateRandomNumber(0,canvas.width),generateRandomNumber(0,canvas.height),10);
    }
}

/*                      Avec une image
const image = new Image();
image.src = '/images/monster.png';
setInterval(moveMonster, 1000/60);
image.addEventListener('load', event => {
    requestAnimationFrame(render);
});
document.addEventListener("keydown", (e)=> moveMonster(e.key))

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, x, y);
    requestAnimationFrame(render);
}
function moveMonster(direction) {
	if(direction=="ArrowDown"){
		y+=dy;
	}
	if(direction=="ArrowUp"){
		y-=dy;
	}
	if(direction=="ArrowLeft"){
		x-=dx;
	}
	if(direction=="ArrowRight"){
		x+=dx;
	}
}
*/