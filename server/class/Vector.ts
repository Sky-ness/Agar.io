import { Player } from "./Player";



export default class Vector {

	x1:number;
	x2:number;
	y1:number;
	y2:number;
	max:number;
	min:number;



	constructor(player: any, mouse: {x:any,y:any}) {
		if(player == 'null' && mouse.x == 'null' && mouse.y == 'null'){
			this.x1 = 0;
			this.x2 = 0;
			this.y1 = 0;
			this.y2 = 0;
			this.max = 100;
			this.min = 5;
		}
		this.x1 = player.x;
		this.x2 = mouse.x;
		this.y1 = player.y;
		this.y2 = mouse.y;
		this.max = 100;
		this.min = 5;
	}
	length() {
		return Math.sqrt(
			Math.pow(this.x2 - this.x1, 2) + Math.pow(this.y2 - this.y1, 2)
		);
	}

	distanceX() {
		return this.x2 - this.x1;
	}

	distanceY() {
		return this.y2 - this.y1;
	}

	normalizeX() {
		return this.distanceX() / this.length();
	}

	normalizeY() {
		return this.distanceY() / this.length();
	}
}
