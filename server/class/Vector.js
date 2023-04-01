export default class vector {
    x1;
    y1;
    x2;
    y2;
    canvas;

    constructor(x1, y1, x2, y2, canvas) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.canvas = canvas;
    }

    length() {
        return Math.sqrt(Math.pow(this.x2- this.x1, 2) + Math.pow(this.y2 - this.y1, 2));
    }

    distanceX() {
        return this.x2 - this.x1 - this.canvas.width / 2;
    }

    distanceY() {
        return this.y2 - this.y1 - this.canvas.height / 2;
    }

    normalizeX() {
        return this.distanceX() / this.length();
    }

    normalizeY() {
        return this.distanceY() / this.length();
    }
}