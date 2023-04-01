export default class View {
	constructor(element) {
		this.element = element;
		this.hide();
	}
	show() {
		this.element.style.display = 'block';
	}
	hide() {
		this.element.style.display = 'none';
	}
}
