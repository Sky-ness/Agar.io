import { Blob } from './Blob.js';

export class Player extends Blob {
	constructor(pseudo, id, color, x, y, score) {
		super(color, x, y, score);
		this.id = id;
		this.pseudo = pseudo;
	}
}
