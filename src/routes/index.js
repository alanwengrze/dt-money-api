const { Router } = require('express');

const transactionsRouter = require('./transactions.routes');

const routes = Router();

routes.use('/transactions', transactionsRouter);

module.exports = routes;