class CharacterView extends View {
	color;
	pseudo;

	constructor(element) {
		super(element);
		this.color = this.element.querySelector('.color');
		this.pseudo = this.element.querySelector('.pseudo');
		this.element.querySelector('button').addEventListener('click', event => {
			event.preventDefault();
			socket.emit('pseudo', this.pseudo.value);
		});
	}
	show() {
		super.show();
	}
}
