export function feedPlayer(mapS) {
	mapS.players.forEach(element => {
		mapS.players.forEach(el => {
			if (element != el) {
				if (mapS.feed(element, el)) {
					element.score += el.score / 2;
					mapS.removePlayer(el.id);
				}
			}
		});
	});
}
export function feedFood(mapS) {
	mapS.players.forEach(element => {
		mapS.foods.forEach(el => {
			if (mapS.feed(element, el)) {
				element.score += 1;
				mapS.removeFood(el);
				return true;
			}
		});
	});
}
