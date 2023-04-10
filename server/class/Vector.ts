const MAX_MAGNITUDE = 5;

export default class Vector {

	distanceX:number;
	distanceY:number;
	direction:number;
	magnitude:number;


	constructor(player: any, mouse: {x:any,y:any}) {
		if(player == 'null' && mouse.x == 'null' && mouse.y == 'null'){
			this.distanceX = 0;
			this.distanceY = 0;
			this.direction = 0;
			this.magnitude = 0;
		}
		this.distanceX = mouse.x - player.x
		this.distanceY =mouse.y - player.y ;
		this.direction = Math.atan2(mouse.y - player.y , mouse.x - player.x);
		this.magnitude = Math.sqrt(Math.pow(this.distanceX,2) + Math.pow(this.distanceY,2));
		if (this.magnitude > MAX_MAGNITUDE) {
			this.magnitude=MAX_MAGNITUDE;
		}
	}
	deplacementX(){
		return this.magnitude * Math.cos(this.direction);
	}
	deplacementY(){
		return this.magnitude * Math.sin(this.direction);
	}

}
