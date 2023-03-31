let sqSize = 0;
let xPos = 0;
let yPos = 0;
let dX = 0;
let dY = 0;
let truc;
let speed = 2;

export function move(mouseX, mouseY) {
	truc = Math.sqrt(Math.pow(xPos - mouseX, 2) + Math.pow(yPos - mouseY, 2));

	if (truc < 150) {
		speed = 1;
	} else {
		speed = 2;
	}

	dX = mouseX - xPos;
	dY = mouseY - yPos;

	xPos += (dX / truc) * speed;
	yPos += (dY / truc) * speed;

	return {
		x: xPos,
		y: yPos,
	};
}
