import View from './View.js';
export default class ScoreView extends View {
	constructor(element) {
		super(element);
		this.scoreBoard = this.element.querySelector('ol');
	}
}
