import CharacterView from './view/CharacterView.js';
import ScoreView from './view/ScoreView.js';
import ReplayView from './view/ReplayView.js';
import CreditsView from './view/CreditsView.js';

import { io } from 'socket.io-client';
//import { resolveModuleName } from 'typescript';
import { Maps } from '../../server/class/Maps.js';
import { drawGame } from './function/drawGame.js';
import { updateZoom, mainZoom } from './function/drawGame.js';
import { mouse } from './function/drawGame.js';
import { resetZoom } from './function/drawGame.js';
import { grid } from './function/drawGame.js';

//                   initialisation du serveur coté client
const socket = io();

const characterView = new CharacterView(document.querySelector('.character')),
	scoreView = new ScoreView(document.querySelector('.score')),
	replayView = new ReplayView(document.querySelector('.replay')),
	creditsView = new CreditsView(document.querySelector('.credits'));

characterView.button.addEventListener('click', event => {
	event.preventDefault();
	characterView.hide();
	socket.emit('play', {
		pseudo: characterView.pseudo,
		color: characterView.color,
	});

	scoreView.show();
});

replayView.button.addEventListener('click', event => {
	event.preventDefault();
	replayView.hide();
	creditsView.hide();
	characterView.show();
});

//-------------------------------------------------------------------------------
let mapC = new Maps();

initSocketEvent();
requestAnimationFrame(render);

function render() {
	drawGame(mapC, scoreView.scoreBoard, socket.id);
	socket.emit('mousePosition', mouse);
	requestAnimationFrame(render);
}

function initSocketEvent() {
	socket.on('map', mapS => (mapC = mapS));

	socket.on('retry', () => {
		replayView.show();
		creditsView.show();
		resetZoom();
	});
}
