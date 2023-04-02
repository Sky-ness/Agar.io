import Vector from "../class/Vector.js";

const speed = 5;

export function move( player,mouseX, mouseY,canvas) {
	
	let v = new Vector(player.x,player.y,mouseX,mouseY,canvas)

	player.x += v.normalizeX() / (player.score / 10) * speed;
	player.y += v.normalizeY() / (player.score / 10) * speed;
}
