import http from 'http';
import express from 'express';
import { env } from 'node:process';
import { Server as IOServer } from 'socket.io';
import addWebpackMiddleware from './utils/addWebpackMiddleware.js';
import { Circle } from './class/Circle.js';
import { Maps } from './class/Maps.js';
import { generateRandomNumber } from './function/random.js';
import { move } from './function/move.js';

const app = express();
const httpServer = http.createServer(app);
const io = new IOServer(httpServer);
addWebpackMiddleware(app);

let mapS = new Maps(1000, 1000);
mapS.randomFood(70, 80);

io.on('connection', socket => {
	console.log(`Nouvelle connexion du client ${socket.id}`);
	socket.on('disconnect', () => {
		console.log(`Déconnexion du client ${socket.id}`);
		// On supprime le joueur de la liste principale quand il se déconnecte
		mapS.removePlayer(socket.id);
	});
	// A la connection du joueur on créer un nouveau joueur sur le plateau
	socket.on('play', () => {
		mapS.addPlayer(
			new Circle(
				socket.id,
				generateRandomNumber(0, mapS.width),
				generateRandomNumber(0, mapS.height),
				generateRandomNumber(20, 50)
			)
		);
		socket.on('mousePosition', mouse => {
			let moveD = move(mouse.x, mouse.y);
			if (mapS.players.find(e => e.pseudo == mouse.id)) {
				mapS.getPlayer(mouse.id).setPosition(moveD.x, moveD.y);
			}
		});
		setInterval(() => {
			mapS.sortPlayer();

			mapS.players.forEach(element => {
				mapS.players.forEach(el => {
					if (element != el) {
						if (mapS.feed(element, el)) {
							element.score += 2;
							mapS.players = mapS.players.filter(
								player => !mapS.feed(element, player)
							);
						}
					}
				});
			});

			mapS.players.forEach(element => {
				mapS.foods.forEach(el => {
					if (mapS.feed(element, el)) {
						element.score += 2;
						mapS.foods = mapS.foods.filter(food => !mapS.feed(element, food));
					}
				});
			});
			io.emit('map', mapS);
		}, 25);
	});
});

//			Système de déplacement (a implémeneter)

// 					page principal du jeu
app.get('/', app.use(express.static('client/public')));

//			Définition du port utilisé pour notre serveur
if (env.PORT == undefined) {
	env.PORT = 8000;
}
httpServer.listen(env.PORT, () => {
	console.log(`Server running at http://localhost:${env.PORT}/`);
});
