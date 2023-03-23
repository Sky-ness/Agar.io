import { Circle } from '../class/Circle.js';
export function randomFood() {
	let foods = [];
	for (let i = 0; i <= generateRandomNumber(70, 80); i++) {
		foods.push(
			new Circle(
				'foods',
				generateRandomNumber(0, 1000),
				generateRandomNumber(0, 500),
				10
			)
		);
	}
	return foods;
}
export function generateRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
