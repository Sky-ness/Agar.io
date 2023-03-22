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

let player = new Circle(canvas.width/2,canvas.height/2,50,'red',context);
let foods = [];

//              générer les points aléatoirement

function generateFood(){
	for(let i=0;i<= generateRandomNumber(20,40);i++){
		foods.push(new Circle(generateRandomNumber(0,canvas.width),generateRandomNumber(0,canvas.height),10,'green',context));
    }
}


generateFood();
requestAnimationFrame(render);
setInterval(player.moveCircle(), 1000/60);

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
	
	foods.forEach(circle => circle.drawCircle());
    requestAnimationFrame(render);
}
//                déplacement avec les fleches
document.addEventListener("keydown", (e)=> player.moveCircle(e.key));

let grow = 30;
let canvasPos = getPosition(canvas);
let mouseX = 0;
let mouseY = 0;
let sqSize = 0;
let xPos = 0;
let yPos = 0;
let dX = 0;
let dY = 0;
 
canvas.addEventListener("mousemove", setMousePosition, false);
 
function setMousePosition(e) {
  mouseX = e.clientX - canvasPos.x;
  mouseY = e.clientY - canvasPos.y;
}
 


function animate() {
  dX = mouseX - xPos;
  dY = mouseY - yPos;
 
  xPos += (dX / 50);
  yPos += (dY / 50);
 
 
 
		
		
		player.drawPlayer('red',xPos - sqSize / 2,yPos - sqSize / 2,grow);
		
 
  requestAnimationFrame(animate);
}
animate();
 
// deal with the page getting resized or scrolled
window.addEventListener("scroll", updatePosition, false);
window.addEventListener("resize", updatePosition, false);
 
function updatePosition() {
  canvasPos = getPosition(canvas);
}
 
// Helper function to get an element's exact position
function getPosition(el) {
  let xPos = 0;
  let yPos = 0;
 
  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      let xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      let yScroll = el.scrollTop || document.documentElement.scrollTop;
 
      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }
 
    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
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


 

