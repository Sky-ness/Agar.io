import View from './View.js';
export default class ScoreBoardView extends View {
	constructor(element) {
		super(element);
		this.scoreBoard = this.element.querySelector('.scoreBoard');
	}
}
