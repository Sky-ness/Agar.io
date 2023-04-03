import http from 'http';
import express from 'express';
import { env } from 'node:process';
import { Server as IOServer } from 'socket.io';
import addWebpackMiddleware from './utils/addWebpackMiddleware.js';

import { Maps } from './class/Maps.js';
import { Player } from './class/Player.js';

import { generateRandomNumber } from './function/random.js';
import { move } from './function/move.js';
import { feedPlayer } from './function/feed.js';

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

let mapS = new Maps(1000, 900);

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
		socket.on('mousePosition', mouse => {
			if (mapS.getPlayer(socket.id) != null) {
				move(mapS.getPlayer(socket.id), mouse.x, mouse.y, {
					width: mapS.width,
					height: mapS.height,
				});
			} else {
				socket.emit('retry');
			}
		});
	});
	setInterval(() => {
		mapS.sortPlayer();
		mapS.randomFood(100);
		mapS.foods.forEach(element => {
			mapS.players.forEach(el => {
				if (mapS.feed(el, element)) {
					el.score += 1;
					socket.emit('eatFood');
					mapS.removeFood(element);
					console.log('emit eat');
				}
			});
		});
		feedPlayer(mapS);

		// il faudra exporter cette function ailleurs
		io.emit('map', mapS);
	}, 25);
});
