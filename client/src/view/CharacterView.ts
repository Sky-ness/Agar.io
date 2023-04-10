
import View from './View';
export default class CharacterView extends View {

	button: HTMLButtonElement;
	color: string = '';
	pseudo: string = '';

	constructor(element: HTMLDivElement) {
		super(element);
		this.button = this.element.querySelector('button') as HTMLButtonElement;
		this.button.addEventListener('click', () => {
		let color = this.element.querySelector('.color') as HTMLFormElement;
		this.color = color.value;
		let pseudo = this.element.querySelector('.pseudo') as HTMLFormElement;
		this.pseudo = pseudo.value;
		});
		this.show();
	}
}
