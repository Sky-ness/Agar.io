// @ts-ignore
import View from './View.ts';
export default class ScoreView extends View {
	scoreBoard: HTMLOListElement;

	constructor(element: HTMLDivElement) {
		super(element);
		this.scoreBoard = this.element.querySelector('ol') as HTMLOListElement;
	}
}
