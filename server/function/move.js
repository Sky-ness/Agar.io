let sqSize = 0;
let xPos = 0;
let yPos = 0;
let dX = 0;
let dY = 0;
let speedX = 50;
let speedY = 50;

export function move(mouseX, mouseY) {
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

	return {
		x: xPos - sqSize / 2,
		y: yPos - sqSize / 2,
	};
}
