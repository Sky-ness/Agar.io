import { generateRandomNumber } from '../function/random.js';
import { Circle } from './Circle.js';

export class Maps {
	players = [];
	foods = [];
	width;
	height;
	constructor(width, height) {
		this.width = width;
		this.height = height;
	}
	randomFood(foodsMin, foodsMax) {
		for (let i = 0; i <= generateRandomNumber(foodsMin, foodsMax); i++) {
			this.foods.push(
				new Circle(
					'foods',
					generateRandomNumber(0, this.width),
					generateRandomNumber(0, this.height),
					10
				)
			);
		}
	}
	addPlayer(player) {
		this.players.push(player);
	}
	removePlayer(pseudo) {
		this.players = this.players.filter(player => player.pseudo !== '' + pseudo);
	}
	feed(circle1, circle2) {
		let rayJ = circle1.score;
		let rayF = circle2.score;
		let a = circle1.score + circle2.score;
		let x = circle1.x - circle2.x;
		let y = circle1.y - circle2.y;

		if (rayJ > Math.sqrt(x * x + y * y) + rayF) {
			player.score += 2;
			return true;
		} else {
			return false;
		}
	}
}
