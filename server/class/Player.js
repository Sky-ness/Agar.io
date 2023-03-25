import { Food } from './Food.js';

export class Player extends Food {
	constructor(pseudo, color, x, y, score) {
		super(color, x, y, score);
		this.pseudo = pseudo;
	}
	setPosition(x, y) {
		this.x = x;
		this.y = y;
	}
}
