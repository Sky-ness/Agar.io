// @ts-ignore
import View from './View.ts';
export default class ReplayView extends View {

	button: HTMLButtonElement;
	constructor(element: HTMLDivElement) {
		super(element);
		this.button = this.element.querySelector('button') as HTMLButtonElement;
	}
}
