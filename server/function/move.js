let dX = 0;
let dY = 0;
let truc;
let speed = 2;

export function move(mouseX, mouseY,player) {

	truc = Math.sqrt(Math.pow(player.x - mouseX, 2) + Math.pow(player.y - mouseY, 2));

	if (truc < 150) {
		speed = 1;
	} else {
		speed = 2;
	}

	dX = mouseX - player.x;
	dY = mouseY - player.y;

	player.x += (dX / truc) * speed;
	player.y += (dY / truc) * speed;
}
