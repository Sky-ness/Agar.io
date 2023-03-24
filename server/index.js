import http from 'http';
import { env } from 'node:process';
import express from 'express';
import { Server as IOServer } from 'socket.io';
import addWebpackMiddleware from './utils/addWebpackMiddleware.js';
import { Circle } from './class/Circle.js';
import { randomFood } from './function/random.js';
import { generateRandomNumber } from './function/random.js';

const app = express();
const httpServer = http.createServer(app);
const io = new IOServer(httpServer);
addWebpackMiddleware(app);

let foods = randomFood();
let players = [];

io.on('connection', socket => {
	console.log(`Nouvelle connexion du client ${socket.id}`);
	socket.on('disconnect', () => {
		// temporaire le temps que les mouvements ne fonctionne pas (ça déconnecte le joueur quand on ferme la page)
		console.log(`Déconnexion du client ${socket.id}`);
		// On supprime le joueur de la liste principale quand il se déconnecte
		players = players.filter(player => player.pseudo !== '' + socket.id);
		// On envoie les informations a tout les autres joueurs foods players restants et on nettoie le canva
		console.log(players);
		io.emit('deconnexion');
		io.emit('foods', foods);
		io.emit('players', players);
	});
	// A la connection du joueur on créer un nouveau joueur sur le plateau
	socket.on('play', () => {
		players.push(
			new Circle(
				socket.id,
				generateRandomNumber(0, 1000),
				generateRandomNumber(0, 500),
				20
			)
		);
		console.log(players);
		//setInterval(() => {
		io.emit('players', players);
		//}, 25);
	});
	io.emit('foods', foods);
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
