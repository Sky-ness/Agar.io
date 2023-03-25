import http from 'http';
import express from 'express';
import { env } from 'node:process';
import { Server as IOServer } from 'socket.io';
import addWebpackMiddleware from './utils/addWebpackMiddleware.js';
import { Maps } from './class/Maps.js';
import { Player } from './class/Player.js';
import { generateRandomNumber } from './function/random.js';
import { move } from './function/move.js';

const app = express();
const httpServer = http.createServer(app);
const io = new IOServer(httpServer);
addWebpackMiddleware(app);

let mapS = new Maps(1000, 1000);
mapS.randomFood(70, 80);

io.on('connection', socket => {
	let name = '' + socket.id;
	let color;
	socket.on('pseudo', pseudo => {
		if (pseudo != '') {
			name = pseudo;
		}
	});
	socket.on('color', color1 => {
		color = color1;
	});

	console.log(`Nouvelle connexion du client ${name}`);
	socket.on('disconnect', () => {
		console.log(`Déconnexion du client ${socket.id}`);
		// On supprime le joueur de la liste principale quand il se déconnecte
		mapS.removePlayer(socket.id);
	});
	// A la connection du joueur on créer un nouveau joueur sur le plateau
	socket.on('play', () => {
		mapS.addPlayer(
			new Player(
				name,
				color,
				generateRandomNumber(0, mapS.width),
				generateRandomNumber(0, mapS.height),
				generateRandomNumber(20, 50)
			)
		);
		socket.on('mousePosition', mouse => {
			let moveD = move(mouse.x, mouse.y);
			mapS.getPlayer(socket.id).setPosition(moveD.x, moveD.y);
		});
		setInterval(() => {
			mapS.sortPlayer();
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
