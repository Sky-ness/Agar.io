
import CharacterView from './view/CharacterView';
import ScoreView from './view/ScoreView';
import ReplayView from './view/ReplayView';
import CreditsView from './view/CreditsView';
import { Maps } from '../../server/class/Maps';
import { drawGame } from './function/drawGame';
import { resetZoom } from './function/drawGame';
import { updateZoom } from './function/drawGame';
import { io, Socket } from "socket.io-client";


//                   initialisation du serveur coté client

interface ServerToClientsEvents {
	map: (map : Maps) => void;
	retry: (score: number) => void;
	scoreMove: (player: { score: number; ancienScore: number; }) => void;
}
interface ClientToServerEvents{
	disconnect: () => void;
	play: (tag: {pseudo: string; color: string}) => void;
	mousePosition: (mouse: {x: number;y: number}) => void;

}
export const socket: Socket<ServerToClientsEvents,ClientToServerEvents> = io();

let timer:number;
let interId: NodeJS.Timer;
const characterView = new CharacterView(document.querySelector('.character') as HTMLDivElement),
	scoreView = new ScoreView(document.querySelector('.score') as HTMLDivElement),
	replayView = new ReplayView(document.querySelector('.replay') as HTMLDivElement),
	creditsView = new CreditsView(document.querySelector('.credits') as HTMLDivElement);
const characterViewButton = characterView.button as HTMLButtonElement,
replayViewButton = replayView.button as HTMLButtonElement;
const nav = document.querySelector('.nav') as HTMLDivElement;
characterViewButton.addEventListener('click', event => {
	event.preventDefault();
	characterView.hide();
	timer=0;
	interId = setInterval(timerInc,1000);
	socket.emit('play', {
		pseudo: characterView.pseudo,
		color: characterView.color,
	});
	
	nav.style.display = 'none'
	scoreView.show();
});

function timerInc(){
	timer++;
}

replayViewButton.addEventListener('click', event => {
	event.preventDefault();
	replayView.hide();
	creditsView.hide();
	characterView.show();
	nav.style.display = 'block'
});

//-------------------------------------------------------------------------------
let mapC: Maps = new Maps(500,500);


initSocketEvent();
requestAnimationFrame(render);

function render() {
	drawGame(mapC, scoreView.scoreBoard, socket.id);
	requestAnimationFrame(render);
}

function initSocketEvent() {
	socket.on('map', (mapS) =>{
		mapC = mapS
	});
	socket.on('retry', (score) => {
		replayView.show();
		window.clearInterval(interId);
		replayView.score.innerHTML = `Votre score : ${score} <br> Votre temps de survie : ${timer} secondes`;
		creditsView.show();
		resetZoom();
	});
	socket.on('scoreMove', player => {
		updateZoom(player.score - player.ancienScore);
	});
}

const credits = document.querySelector('.Credits') as HTMLLinkElement;
credits.addEventListener('click', (event) => {
	event.preventDefault();
	characterView.hide();
	scoreView.hide();
	creditsView.show();
})



const score = document.querySelector('.score') as HTMLDivElement;
const classement = document.querySelector('.Classement') as HTMLLinkElement;
classement.addEventListener('click', (event) => {
	event.preventDefault();
	score.classList.add('scoreView');
	score.classList.remove('score');
	characterView.hide();
	creditsView.hide();
	scoreView.show();
})

const jeu = document.querySelector('.Jeu') as HTMLLinkElement;
jeu.addEventListener('click', (event) => {
	event.preventDefault();
	characterView.show();
	score.classList.add('score');
	score.classList.remove('scoreView');
	creditsView.hide();
	scoreView.hide();
})
