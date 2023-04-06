export default class Vector {
	constructor(player, mouse) {
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
