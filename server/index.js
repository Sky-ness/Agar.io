import http from 'http';
import { env } from 'node:process';
import express from 'express';
import { readFileSync } from 'node:fs';
import { Server as IOServer } from 'socket.io';
import addWebpackMiddleware from './addWebpackMiddleware.js';

const app = express();
const httpServer = http.createServer(app);
const io = new IOServer(httpServer);
addWebpackMiddleware(app);

io.on('connection', socket => {
	console.log(`Nouvelle connexion du client ${socket.id}`);
	socket.on('disconnect', () => {
		console.log(`Déconnexion du client ${socket.id}`);
	});

});

app.get('/', app.use(express.static('client/public')));

app.get('/jeu', (req, res) => {

});

app.get('/rejouer', (req, res) => {

});

app.get('/credits', (req, res) => {

});

app.get('/scores', (req, res) => {

});

if (env.PORT == undefined) {
	env.PORT = 8000;
}
httpServer.listen(env.PORT, () => {
	console.log(`Server running at http://localhost:${env.PORT}/`);
});
