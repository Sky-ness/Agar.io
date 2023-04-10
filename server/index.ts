import http from 'http';
import express from 'express';
import { env } from 'node:process';
import { Server } from 'socket.io';
import addWebpackMiddleware from './utils/addWebpackMiddleware';

import { Maps } from './class/Maps';
import { Player } from './class/Player';
import Vector from './class/Vector';

import { generateRandomNumber } from './function/random';
import { move } from './function/move';
import { feed, invincibility, scoreMove } from './function/feed';
const app = express();
const httpServer = http.createServer(app);

interface ServerToClientsEvents {
	map: (map : Maps) => void;
	retry: () => void;
}
interface ClientToServerEvents{
	disconnect: () => void;
	play: (tag: {pseudo: string; color: string}) => void;
	mousePosition: (mouse: {x: number;y: number}) => void;
}


const io = new Server<ClientToServerEvents,ServerToClientsEvents>(httpServer);
addWebpackMiddleware(app);

// 					page principal du jeu
app.get('/', app.use(express.static('client/public')));

//			Définition du port utilisé pour notre serveur

if (env.PORT == undefined) {
	env.PORT = '8000';
}



httpServer.listen(env.PORT, () => {
	console.log(`Server running at http://localhost:${env.PORT}/`);
});

let mapS = new Maps(500, 500);

io.on('connection', socket => {
	console.log(`Nouvelle connexion du client ${socket.id}`);
	socket.on('disconnect', () => {
		console.log(`Déconnexion du client ${socket.id}`);
		mapS.removePlayer(socket.id);
	});
	socket.on('play', tag => {
		mapS.addPlayer(
			new Player(
				socket.id,
				tag.pseudo,
				tag.color,
				generateRandomNumber(0, mapS.width),
				generateRandomNumber(0, mapS.height),
				20
			)
		);
		let player: Player = mapS.getPlayer(socket.id);
		invincibility(player, 3);
		socket.on('mousePosition', mouse => {
			if (mapS.getPlayer(socket.id) != null) {
				player.vector = new Vector(
					player,
					mouse
				);
			} else if (player.lose === true) {
				socket.emit('retry');
			}
		});
	});
	setInterval(() => {
		mapS.sortPlayer();
		mapS.randomFood(100);
		if (
			mapS.getPlayer(socket.id) != null &&
			mapS.getPlayer(socket.id).vector != null
		) {
			move(mapS.getPlayer(socket.id), mapS);
		}
		if (mapS.getPlayer(socket.id) != null) {
			scoreMove(mapS.getPlayer(socket.id), socket);
		}
		feed(mapS);
		io.emit('map', mapS);
	}, 25);
});
