import { Blob } from './Blob';

export class Player extends Blob {

	id: string;
	pseudo: string;
	vector: any;
	isFeedable: boolean;
	ancienScore: number;
	lose: boolean = false;


	constructor(id: string, pseudo: string, color: string, x: number, y: number, score: number) {
		super(color, x, y, score);
		this.id = id;
		this.pseudo = pseudo;
		this.vector = null;
		this.isFeedable = false;
		this.ancienScore = score;
	}
}
