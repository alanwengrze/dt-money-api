const knex = require('../database/knex');
const AppError = require('../utils/AppError');
class TransactionsController {
  async create(request, response) {
    const { user_id } = request.query;
    const { description, price, type, category } = request.body;
    const [transaction_id] = await knex('transactions').insert({
      description,
      price,
      category,
      type,
      user_id: user_id,
      created_at: knex.fn.now(),
    })

    return response.json({description, price, type, category, user_id, id: transaction_id});
  }

  async show(request, response) {
    const { id } = request.params;
    const { user_id } = request.query;

    const transaction = await knex('transactions')
    .where('id', id)
    .andWhere('user_id', user_id)
    .first();

    return response.json(transaction);
  }

  async index(request, response) {
    const { description, price, type, category, user_id } = request.query;

    if(!description && !price && !type && !category) {
      const transactions = await knex('transactions')
      .where('user_id', user_id)
      .select('*')
      .orderBy('created_at', 'desc');
      
      return response.json(transactions);
    }

    if(type){
      if(type === 'income') {
        const transactions = await knex('transactions')
        .where('type', 'income')
        .andWhere('user_id', user_id)
        .select('*')
        .orderBy('created_at', 'desc');
        return response.json(transactions);
      } else if(type === 'outcome') {
        const transactions = await knex('transactions')
        .where('type', 'outcome')
        .andWhere('user_id', user_id)
        .select('*')
        .orderBy('created_at', 'desc');
        return response.json(transactions);
      }
    }
  }

  async update(request, response) {
    const { id } = request.params;
    const { description, price, type, category } = request.body;
    const { user_id } = request.query;

    if(!user_id) {
      throw new AppError('User not found', 404);
    }

    const transaction = await knex('transactions')
    .where('id', id)
    .andWhere('user_id', user_id)
    .first();

    if(!transaction) {
      throw new AppError('Transaction not found', 404);
    }
    
    await knex('transactions')
      .where({id, user_id})
      .update({
      description,
      price,
      type,
      category,
      updated_at: knex.fn.now()
    });

    return response.json({id, description, price, type, category, user_id});
  }

  async delete(request, response) {
    const { id } = request.params;
    const { user_id } = request.query;
    await knex('transactions')
    .where('id', id)
    .andWhere('user_id', user_id)
    .delete();

    return response.status(204).send();
  }
}

module.exports = TransactionsController;