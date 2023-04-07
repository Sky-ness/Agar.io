const speed = 10;

export function move(player, mapS) {
	let moveX = (player.vector.normalizeX() / (player.score / 10)) * speed;
	let moveY = (player.vector.normalizeY() / (player.score / 10)) * speed;

	// if (vector.normalizeX() <= 0.1 && vector.normalizeX() >= -0.1) moveX = 0;
	// if (vector.normalizeY() <= 0.1 && vector.normalizeY() >= -0.1) moveY = 0;

	if (!mapS.outOfBoundsX(player)) player.x += moveX;
	else if (player.x <= 0 && moveX >= 0) player.x += moveX;
	else if (player.x >= mapS.width && moveX <= 0) player.x += moveX;

	if (!mapS.outOfBoundsY(player)) player.y += moveY;
	else if (player.y <= 0 && moveY >= 0) player.y += moveY;
	else if (player.y >= mapS.height && moveY <= 0) player.y += moveY;
}
