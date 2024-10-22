import { Socket } from "socket.io";
import { Maps } from "../class/Maps";
import { Player } from "../class/Player";

export function feed(mapS: Maps) {
	mapS.players.forEach(element => {
		mapS.players.forEach(el => {
			if (element != el) {
				if (mapS.feed(element, el) && el.isFeedable && element.isFeedable) {
					element.score += el.score / 2;
					el.lose = true;
					mapS.removePlayer(el.id);
					return true;
				}
			}
		});
	});
	mapS.foods.forEach(element => {
		mapS.players.forEach(el => {
			if (mapS.feed(el, element)) {
				el.score += 1;
				mapS.removeFood(element);
				return true;
			}
		});
	});
	return false;
}

export function scoreMove(player: Player, socket: Socket) {
	if (player.score !== player.ancienScore) {
		socket.emit('scoreMove', player);
		player.ancienScore = player.score;
	}
}
