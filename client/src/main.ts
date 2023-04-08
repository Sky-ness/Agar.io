// @ts-ignore
import CharacterView from './view/CharacterView.ts';
// @ts-ignore
import ScoreView from './view/ScoreView.ts';
// @ts-ignore
import ReplayView from './view/ReplayView.ts';
// @ts-ignore
import CreditsView from './view/CreditsView.ts';


//import { resolveModuleName } from 'typescript';
// @ts-ignore
import { Maps } from '../../server/class/Maps.ts';
// @ts-ignore
import { drawGame } from './function/drawGame.ts';
// @ts-ignore
import { resetZoom } from './function/drawGame.ts';
// @ts-ignore
import { updateZoom } from './function/drawGame.ts';
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
