export function generateRandomNumber(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function randomColor() {
	var randomHex = Math.floor(Math.random() * 16777215).toString(16);
	while (randomHex.length < 6) {
	  randomHex = "0" + randomHex;
	}
	return "#" + randomHex;
  }