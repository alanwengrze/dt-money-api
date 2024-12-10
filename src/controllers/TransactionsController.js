const knex = require('../database/knex');
const AppError = require('../utils/AppError');
class TransactionsController {
  async create(request, response) {
    const { description, price, type, category } = request.body;
    const [transaction_id] = await knex('transactions').insert({
      description,
      price,
      category,
      type,
      created_at: knex.fn.now(),
    })

    return response.json(transaction_id);
  }

  async show(request, response) {
    const { id } = request.params;

    const transaction = await knex('transactions').where('id', id).first();

    return response.json(transaction);
  }

  async index(request, response) {
    const { description, price, type, category } = request.query;

    if(!description && !price && !type && !category) {
      const transactions = await knex('transactions').select('*')
      .orderBy('created_at', 'desc');
      
      return response.json(transactions);
    }

    if(type){
      if(type === 'income') {
        const transactions = await knex('transactions').select('*')
        .where('type', 'income')
        .orderBy('created_at', 'desc');
        return response.json(transactions);
      } else if(type === 'outcome') {
        const transactions = await knex('transactions').select('*')
        .where('type', 'outcome')
        .orderBy('created_at', 'desc');
        return response.json(transactions);
      }
    }
  }

  async update(request, response) {
    const { id } = request.params;
    const { description, price, type, category } = request.body;
    const transaction = await knex('transactions').where('id', id).first();

    if(!transaction) {
      throw new AppError('Transação não encontrada', 404);
    }

    await knex('transactions').where('id', id).update({
      description,
      price,
      type,
      category,
      updated_at: knex.fn.now()
    });

    return response.json({description, price, type, category});
  }

  async delete(request, response) {
    const { id } = request.params;
    await knex('transactions').where('id', id).delete();

    return response.status(204).send();
  }
}

module.exports = TransactionsController;