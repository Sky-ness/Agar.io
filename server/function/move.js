let sqSize = 0;
let xPos = 0;
let yPos = 0;
let dX = 0;
let dY = 0;
let speedX = 50;
let speedY = 50;

export function move(mouseX, mouseY) {
	let truc = Math.sqrt(Math.pow(xPos - mouseX, 2) + Math.pow(yPos - mouseY, 2));

	dX = mouseX - xPos;
	dY = mouseY - yPos;

	xPos += (dX / truc) * 2;
	yPos += (dY / truc) * 2;

	return {
		x: xPos,
		y: yPos,
	};
}
