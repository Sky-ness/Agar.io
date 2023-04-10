
import View from './View';
export default class ReplayView extends View {
	score: HTMLDivElement;
	button: HTMLButtonElement;
	constructor(element: HTMLDivElement) {
		super(element);
		this.score = this.element.querySelector('#score') as HTMLDivElement;
		this.button = this.element.querySelector('button') as HTMLButtonElement;
	}

}
