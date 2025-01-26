import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class ShoppingListService {
  constructor(@Inject('DATABASE_POOL') private readonly pool: Pool) {}

  async createShoppingList(userId: number, name: string) {
    const query = `
      INSERT INTO shopping_lists (user_id, name)
      VALUES ($1, $2)
      RETURNING id, name, created_at
    `;
    const values = [userId, name];
    const result = await this.pool.query(query, values);
    return result.rows[0];
  }

  async getUserShoppingLists(userId: number) {
    const query = `SELECT * FROM shopping_lists WHERE user_id = $1`;
    const result = await this.pool.query(query, [userId]);
    return result.rows;
  }

  async addItemToList(listId: number, itemName: string) {
    const query = `
      INSERT INTO list_items (list_id, item_name)
      VALUES ($1, $2)
      RETURNING id, item_name, is_checked
    `;
    const values = [listId, itemName];
    const result = await this.pool.query(query, values);
    return result.rows[0];
  }

  async markListAsCompleted(listId: number, totalCost: number) {
    const query = `UPDATE shopping_lists SET completed = true, total_cost = $1 WHERE id = $2`;
    await this.pool.query(query, [totalCost, listId]);
    return { message: 'List marked as completed' };
  }
}