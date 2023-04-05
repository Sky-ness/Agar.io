import Vector from '../class/Vector.js';

const speed = 10;

export function move(player, mouseX, mouseY, mapS) {
	let v = new Vector(player.x, player.y, mouseX, mouseY, mapS);

	const moveX = (v.normalizeX() / (player.score / 10)) * speed;
	const moveY = (v.normalizeY() / (player.score / 10)) * speed;

	if (!mapS.outOfBoundsX(player)) player.x += moveX;
	else if (player.x <= 0 && moveX >= 0) player.x += moveX;
	else if (player.x >= mapS.width && moveX <= 0) player.x += moveX;

	if (!mapS.outOfBoundsY(player)) player.y += moveY;
	else if (player.y <= 0 && moveY >= 0) player.y += moveY;
	else if (player.y >= mapS.height && moveY <= 0) player.y += moveY;
}
