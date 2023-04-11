import { Maps } from "../class/Maps";
import { Player } from "../class/Player";

export function move(player: Player, mapS: Maps) {
	let moveX = (player.vector.deplacementX() / (player.score / 10));
	let moveY = (player.vector.deplacementY() / (player.score / 10) );

	

	if (!mapS.outOfBoundsX(player)) player.x += moveX;
	else if (player.x <= 0 && moveX >= 0) player.x += moveX;
	else if (player.x >= mapS.width && moveX <= 0) player.x += moveX;

	if (!mapS.outOfBoundsY(player)) player.y += moveY;
	else if (player.y <= 0 && moveY >= 0) player.y += moveY;
	else if (player.y >= mapS.height && moveY <= 0) player.y += moveY;
}
