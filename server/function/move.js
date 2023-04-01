let dX = 0;
let dY = 0;
let hypothenuse;
let speed = 4;

export function move(mouseX, mouseY, player) {
	hypothenuse = Math.sqrt(
		Math.pow(player.x - mouseX, 2) + Math.pow(player.y - mouseY, 2)
	);

	if (hypothenuse < 150) {
		speed = 10;
	} else {
		speed = 5;
	}

	dX = mouseX - player.x;
	dY = mouseY - player.y;

	player.x += (dX / hypothenuse) * speed;
	player.y += (dY / hypothenuse) * speed;
}
