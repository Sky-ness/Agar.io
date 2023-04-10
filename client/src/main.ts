
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
	retry: () => void;
	scoreMove: (player: { score: number; ancienScore: number; }) => void;
}
interface ClientToServerEvents{
	disconnect: () => void;
	play: (tag: {pseudo: string; color: string}) => void;
	mousePosition: (mouse: {x: number;y: number}) => void;

}
export const socket: Socket<ServerToClientsEvents,ClientToServerEvents> = io();

const characterView = new CharacterView(document.querySelector('.character') as HTMLDivElement),
	scoreView = new ScoreView(document.querySelector('.score') as HTMLDivElement),
	replayView = new ReplayView(document.querySelector('.replay') as HTMLDivElement),
	creditsView = new CreditsView(document.querySelector('.credits') as HTMLDivElement);
const characterViewButton = characterView.button as HTMLButtonElement,
	replayViewButton = replayView.button as HTMLButtonElement;
characterViewButton.addEventListener('click', event => {
	event.preventDefault();
	characterView.hide();
	console.log('click');
	socket.emit('play', {
		pseudo: characterView.pseudo,
		color: characterView.color,
	});
	scoreView.show();
});

replayViewButton.addEventListener('click', event => {
	event.preventDefault();
	replayView.hide();
	creditsView.hide();
	characterView.show();
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
	socket.on('map', mapS => (mapC = mapS));
	socket.on('retry', () => {
		replayView.show();
		creditsView.show();
		resetZoom();
	});
	socket.on('scoreMove', player => {
		updateZoom(player.score - player.ancienScore);
	});
}
