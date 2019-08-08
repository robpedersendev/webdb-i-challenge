const express = require('express');

const db = require('./data/dbConfig.js');

const AccountsRouter = require('./routers/AccountsRouter');

const server = express();

server.use(express.json());

server.use('/api/accounts', AccountsRouter);


server.get('/', (req, res) => {
 res.send('<h3>Welcome to the webdb-i-challenge</h3>');
});


module.exports = server;