const express = require('express');

const db = require('./data/dbConfig.js');

const ActionsRouter = require('./routers/ActionsRouter');

const server = express();

server.use(express.json());

server.use('/api/actions', ActionsRouter);


server.get('/', (req, res) => {
 res.send('<h3>Welcome to the webdb-i-challenge</h3>');
});


module.exports = server;