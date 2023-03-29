import { generateRandomNumber } from '../function/random.js';
import { Food } from './Food.js';
import { randomColor } from '../function/random.js';

export class Maps {
	players = [];
	foods = [];
	width;
	height;
	constructor(width, height) {
		this.width = width;
		this.height = height;
	}
	randomFood(foodsMax) {
		while (this.foods.length < foodsMax) {
			for (let i = 0; i <= generateRandomNumber(0, 20); i++) {
				this.foods.push(
					new Food(
						randomColor(),
						generateRandomNumber(0, this.width),
						generateRandomNumber(0, this.height),
						10
					)
				);
			}
		}
	}
	addPlayer(player) {
		this.players.push(player);
	}
	getPlayer(pseudo) {
		return this.players.filter(player => player.pseudo === '' + pseudo)[0];
	}
	removePlayer(pseudo) {
		this.players = this.players.filter(player => player.pseudo !== '' + pseudo);
	}
	sortPlayer() {
		this.players.sort((a, b) => a.score - b.score);
	}
	feed(circle1, circle2) {
		let rayC1 = circle1.score;
		let rayC2 = circle2.score;
		let a = circle1.score + circle2.score;
		let x = circle1.x - circle2.x;
		let y = circle1.y - circle2.y;

		if (rayC1 > Math.sqrt(x * x + y * y) + rayC2) {
			player.score += 2;
			return true;
		} else {
			return false;
		}
	}
}
