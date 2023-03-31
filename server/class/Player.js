import { Food } from './Food.js';

export class Player extends Food {
	constructor(pseudo, id , color, x, y, score) {
		super(color, x, y, score);
		this.pseudo = pseudo;
		this.id = id;
	}
}
