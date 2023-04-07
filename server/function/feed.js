export function feed(mapS) {
	mapS.players.forEach(element => {
		mapS.players.forEach(el => {
			if (element != el) {
				if (mapS.feed(element, el) && el.isFeedable && element.isFeedable) {
					element.score += el.score / 2;
					el.lose = true;
					mapS.removePlayer(el.id);
				}
			}
		});
	});
	mapS.foods.forEach(element => {
		mapS.players.forEach(el => {
			if (mapS.feed(el, element)) {
				el.score += 1;
				mapS.removeFood(element);
			}
		});
	});
}
let counter;

export function invincibility(sec, player) {
	let timeElapsed = 0;
	counter = setInterval(() => {
		timeElapsed++;
		if (timeElapsed === sec) {
			player.isFeedable = true;
			clearInterval(counter);
		}
	}, 1000);
}

export function scoreMove(player, socket) {
	if (player.score !== player.ancienScore) {
		socket.emit('scoreMove', player);
		player.ancienScore = player.score;
	}
}
