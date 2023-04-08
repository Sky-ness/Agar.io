// @ts-ignore
import { generateRandomNumber, randomColor } from '../function/random.ts';
// @ts-ignore
import { Blob } from './Blob.ts';
// @ts-ignore
import { Player } from './Player.js';

export class Maps {
	players: Player[] = [];
	foods: Blob[] = [];
	width: number;
	height: number;
	constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
	}
	addPlayer(player: Player) {
		this.players.push(player);
	}
	getPlayer(id: string) { 
		return this.players.find(player => player.id == id)!;
	}
	removePlayer(id:string) {
		this.players = this.players.filter(player => player.id !== id);
	}
	removeFood(feed:Blob) {
		this.foods = this.foods.filter(food => food !== feed);
	}
	sortPlayer() {
		this.players.sort((a, b) => a.score - b.score);
	}
	outOfBoundsX(player:Player) {
		if (player.x >= this.width) return true;
		else if (player.x <= 0) return true;
		return false;
	}
	outOfBoundsY(player:Player) {
		if (player.y >= this.height) return true;
		else if (player.y <= 0) return true;
		return false;
	}
	feed(circle1:Player, circle2: any) {
		let rayC1 = circle1.score;
		let rayC2 = circle2.score;
		let x = circle1.x - circle2.x;
		let y = circle1.y - circle2.y;

		if (rayC1 > Math.sqrt(x * x + y * y) + rayC2) {
			return true;
		} else {
			return false;
		}
	}
	randomFood(foodsMax: number) {
		while (this.foods.length < foodsMax) {
			for (let i = 0; i <= generateRandomNumber(0, 10); i++) {
				this.foods.push(
					new Blob(
						randomColor(),
						generateRandomNumber(0, this.width),
						generateRandomNumber(0, this.height),
						10
					)
				);
			}
		}
	}
}
