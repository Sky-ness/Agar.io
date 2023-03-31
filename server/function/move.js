let dX = 0;
let dY = 0;
let truc;
let speed = 20;

export function move(mouseX, mouseY,player) {

	truc = Math.sqrt(Math.pow(player.x - mouseX, 2) + Math.pow(player.y - mouseY, 2));

	if (truc < 150) {
		speed = 10;
	} else {
		speed = 20;
	}

	dX = mouseX - player.x;
	dY = mouseY - player.y;

	player.x += (dX / truc) * speed;
	player.y += (dY / truc) * speed;
}
