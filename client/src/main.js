import CharacterView from './view/CharacterView.js';
import ScoreBoardView from './view/ScoreBoardView.js';
import ReplayView from './view/ReplayView.js';

import { io } from 'socket.io-client';
//import { resolveModuleName } from 'typescript';
import { Maps } from '../../server/class/Maps.js';
import { drawGame } from './function/drawGame.js';
import { updateScale } from './function/drawGame.js';
import { mouse } from './function/drawGame.js';

//                   initialisation du serveur coté client
const socket = io();

const characterView = new CharacterView(document.querySelector('.character')),
	scoreBoardView = new ScoreBoardView(document.querySelector('.score')),
	replayView = new ReplayView(document.querySelector('.replay'));

// 					character chooser

characterView.button.addEventListener('click', event => {
	event.preventDefault();
	characterView.hide();
	scoreBoardView.show();
	socket.emit('pseudo', characterView.pseudo);
	socket.emit('color', characterView.color);
	socket.emit('play');

	// context.scale(scale, scale);
	// context.save();
});

//-------------------------------------------------------------------------------
let mapC = new Maps();

initSocketEvent();
requestAnimationFrame(render);

function render() {
	drawGame(mapC, scoreBoardView.element);
	socket.emit('mousePosition', mouse);
	requestAnimationFrame(render);
}

function initSocketEvent() {
	socket.on('map', mapS => (mapC = mapS));
	socket.on('eatFood', () => updateScale());
	socket.on('retry', () => replayView.show());
}
