import http from 'http';
import express from 'express';
import { env } from 'node:process';
import { Server as IOServer } from 'socket.io';
import addWebpackMiddleware from './utils/addWebpackMiddleware.js';

import { Maps } from './class/Maps.js';
import { Player } from './class/Player.js';
import Vector from './class/Vector.js';

import { generateRandomNumber } from './function/random.js';
import { move } from './function/move.js';
import { feed, invincibility, scoreMove } from './function/feed.js';

const app = express();
const httpServer = http.createServer(app);
const io = new IOServer(httpServer);
addWebpackMiddleware(app);

// 					page principal du jeu
app.get('/', app.use(express.static('client/public')));

//			Définition du port utilisé pour notre serveur
if (env.PORT == undefined) {
	env.PORT = 8000;
}
httpServer.listen(env.PORT, () => {
	console.log(`Server running at http://localhost:${env.PORT}/`);
});

let mapS = new Maps(500, 500);
let ancienScore = 20;

io.on('connection', socket => {
	console.log(`Nouvelle connexion du client ${socket.id}`);
	socket.on('disconnect', () => {
		console.log(`Déconnexion du client ${socket.id}`);
		mapS.removePlayer(socket.id);
	});
	socket.on('play', tag => {
		let lose = false;
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
		invincibility(3, mapS.getPlayer(socket.id));
		socket.on('mousePosition', mouse => {
			if (mapS.getPlayer(socket.id) != null) {
				mapS.getPlayer(socket.id).vector = new Vector(
					mapS.getPlayer(socket.id),
					mouse
				);
			} else if (lose === false) {
				socket.emit('retry');
				lose = true;
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
