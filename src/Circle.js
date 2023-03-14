export class Circle{
    constructor(x,y,score,color,context){
        this.x=x;
        this.y=y;
        this.color=color;
        this.score=score;
        this.color=color
        this.vitesse = 5;
        this.context=context;
    }
    moveCircle(direction) {
	    if(direction=="ArrowDown"){
	    	this.y+=this.vitesse;
	    }
	    if(direction=="ArrowUp"){
		    this.y-=this.vitesse;
    	}
	    if(direction=="ArrowLeft"){
		    this.x-=this.vitesse;
	    }
	    if(direction=="ArrowRight"){
		    this.x+=this.vitesse;
	    }
    }
    drawCircle(){
        this.context.beginPath();
        this.context.fillStyle = ''+this.color;
        this.context.lineWidth = 5;
        this.context.arc(this.x, this.y, this.score, 0, 360, false);
        this.context.stroke();
        this.context.fill();
    }

    drawPlayer(color,x,y,taille){
        this.context.beginPath();
        this.context.fillStyle = "" + this.color;
        this.context.arc(x,y,taille,0,360, false);
        this.context.stroke();
        this.context.fill();
    }

    scoreVariation(){

    }
} 