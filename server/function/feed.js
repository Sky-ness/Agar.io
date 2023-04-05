export function feed(mapS) {
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
	mapS.foods.forEach(element => {
		mapS.players.forEach(el => {
			if (mapS.feed(el, element)) {
				el.score += 1;
				mapS.removeFood(element);
			}
		});
	});
}
