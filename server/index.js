import http from 'http';
import { env } from 'node:process';
import express from 'express';
import { Server as IOServer } from 'socket.io';
import addWebpackMiddleware from './addWebpackMiddleware.js';
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
		console.log(`Déconnexion du client ${socket.id}`);
	});
	players.push(
		new Circle(
			generateRandomNumber(0, window.innerWidth),
			generateRandomNumber(0, window.innerWidth),
			20
		)
	);
	io.emit('foods', foods);
	io.emit('players', players);
	socket.emit('game', (foods, players));
});

app.get('/', app.use(express.static('client/public')));

app.get('/credits', (req, res) => {});

app.get('/scores', (req, res) => {});

if (env.PORT == undefined) {
	env.PORT = 8000;
}
httpServer.listen(env.PORT, () => {
	console.log(`Server running at http://localhost:${env.PORT}/`);
});
