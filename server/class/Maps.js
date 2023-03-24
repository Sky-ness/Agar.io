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
}
