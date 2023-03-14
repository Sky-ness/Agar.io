import { generateRandomNumber } from './random.js';
import { Circle } from './Circle.js';
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

let player = new Circle(generateRandomNumber(0,canvas.width),generateRandomNumber(0,canvas.height),50,'red',context);
let foods = [];

//              générer les points aléatoirement

function generateFood(){
	for(let i=0;i<= generateRandomNumber(20,40);i++){
		foods.push(new Circle(generateRandomNumber(0,canvas.width),generateRandomNumber(0,canvas.height),10,'green',context));
    }
}

requestAnimationFrame(render);
setInterval(player.moveCircle(), 1000/60);

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    generateFood();
	player.drawCircle();
	foods.forEach(circle => circle.drawCircle());
    requestAnimationFrame(render);
}
//                déplacement avec les fleches
document.addEventListener("keydown", (e)=> player.moveCircle(e.key));





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