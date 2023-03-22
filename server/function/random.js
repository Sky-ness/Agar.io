import { Circle } from '../class/Circle.js';
export function randomFood() {
	let foods = [];
	for (let i = 0; i <= generateRandomNumber(70, 80); i++) {
		foods.push(
			new Circle(
				generateRandomNumber(0, window.innerWidth),
				generateRandomNumber(0, window.innerHeight),
				10,
				'green'
			)
		);
	}
	return foods;
}
export function generateRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
