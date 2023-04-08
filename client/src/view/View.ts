export default class View {
	element: HTMLDivElement;

	constructor(element: HTMLDivElement) {
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
