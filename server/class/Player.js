import { Blob } from './Blob.js';

export class Player extends Blob {
	constructor(id, pseudo, color, x, y, score) {
		super(color, x, y, score);
		this.id = id;
		this.pseudo = pseudo;
		this.vector = null;
		this.feedable = false;
	}
}
