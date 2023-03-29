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

// 					page principal du jeu
app.get('/', app.use(express.static('client/public')));

//			Définition du port utilisé pour notre serveur
if (env.PORT == undefined) {
	env.PORT = 8000;
}
httpServer.listen(env.PORT, () => {
	console.log(`Server running at http://localhost:${env.PORT}/`);
});

let mapS = new Maps(2500, 1200);

io.on('connection', socket => {
	// par default le pseudo du joueur est la socket id si il ne compléte pas le champ
	let name = '' + socket.id;
	//par default la couleur est noir si elle n'est pas compléter
	let color;
	//On reçoit le pseudo du joueur
	socket.on('pseudo', pseudo => {
		if (pseudo != '') {
			name = pseudo;
		}
	});
	// on reçoit la couleur selectionner par le joueur
	socket.on('color', color1 => {
		color = color1;
	});
	console.log(`Nouvelle connexion du client ${name}`);
	socket.on('disconnect', () => {
		console.log(`Déconnexion du client ${name}`);
		// on enleve le joueur quand il se déconnecte
		mapS.removePlayer(name);
	});

	// Quand le joueur appuie sur play on créer un nouveau joueur sur le plateau
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
			//On récupére la position ou le jouer doit bouger
			let moveD = move(mouse.x, mouse.y);
			//On set la position du joueur en conséquence
			mapS.getPlayer(name).setPosition(moveD.x, moveD.y);
		});
	});
	setInterval(() => {
		//les joueurs sont trier du min au max
		mapS.sortPlayer();
		// la nourriture est regénérer si elle est inférieur a 100
		mapS.randomFood(200);
		//On émet la position des joueurs
		io.emit('map', mapS);
	}, 25);
});
