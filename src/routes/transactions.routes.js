const { Router } = require('express');

const TransactionsController = require('../controllers/TransactionsController');

const transactionsRoutes = Router();

const transactionsController = new TransactionsController();

transactionsRoutes.post('/', transactionsController.create)
transactionsRoutes.get('/:id', transactionsController.show)
transactionsRoutes.get('/', transactionsController.index)
transactionsRoutes.put('/:id', transactionsController.update)
transactionsRoutes.delete('/:id', transactionsController.delete)

module.exports = transactionsRoutes