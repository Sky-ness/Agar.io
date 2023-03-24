import http from 'http';
import { env } from 'node:process';
import express from 'express';
import { Server as IOServer } from 'socket.io';
import addWebpackMiddleware from './utils/addWebpackMiddleware.js';
import { generateRandomNumber } from './function/random.js';
import { Maps } from './class/Maps.js';
import { Player } from './class/Player.js';

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
		console.log(`Déconnexion du client ${name}`);
		mapS.removePlayer(name);
		console.log(mapS.players);
		io.emit('map', mapS);
	});
	// A la connection du joueur on créer un nouveau joueur sur le plateau
	socket.on('play', () => {
		mapS.addPlayer(
			new Player(
				name,
				color,
				generateRandomNumber(0, mapS.width),
				generateRandomNumber(0, mapS.height),
				20
			)
		);
		console.log(mapS.players);
		setInterval(() => {
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
