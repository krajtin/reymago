// ESTRUCTURA BASE DE ARRANQUE DEL PROYECTO
const express = require('express');
const next = require('next');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
console.log('NODE ENV= ', process.env.NODE_ENV)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: ".", dev })
const handle = app.getRequestHandler()



app
	.prepare()
	.then(() => {
		const server = express()
		server.set('view engine', 'html');
		server.use(express.json({ extended: true }));
		server.use(cors());

		server.get('*', (req, res) => {
			return handle(req, res);
		});
		server.post('*', (req, res) => {
			return handle(req, res);
		});
		server.delete('*', (req, res) => {
			return handle(req, res);
		});
		server.put('*', (req, res) => {
			return handle(req, res);
		});
		server.all('*', (req, res) => {
			return handle(req, res)
		})
		server.listen(PORT, (err) => {
			if (err) throw err
			console.log(`> Ready on http://localhost:${PORT}`)
		})
	})