export default class Vector {
	constructor(x1, y1, x2, y2) {
		this.x1 = x1;
		this.x2 = x2;
		this.y1 = y1;
		this.y2 = y2;
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
