import View from './View.js';
export default class CharacterView extends View {
	constructor(element) {
		super(element);
		this.button = this.element.querySelector('button');
		this.button.addEventListener('click', () => {
			this.color = this.element.querySelector('.color').value;
			this.pseudo = this.element.querySelector('.pseudo').value;
		});
		this.show();
	}
}
