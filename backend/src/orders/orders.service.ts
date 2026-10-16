import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class OrdersService {
  constructor(private db: DatabaseService) {}

  private pool = () =>  this.db.getPool();

  async createOrders(orders_id: number, orders_date: string) {
    // const hashed = await bcrypt.hash(password, 10);

    const [result] = await this.pool().execute<OkPacket>(
      'INSERT INTO orders (orders_id, orders_date) VALUES (?, ?)',
      [orders_id, orders_date],
    );
    return { id: result.insertId, orders_id, orders_date };
  }

  async findById(id: number) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM orders WHERE id = ?',
      [id],
    );
    return rows[0];
  }

  async getAll() {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM orders',
    );
    return rows;
  }

  async updateOrders(
    id: number,
    partial: { orders_id?: number; orders_date?: string },
  ) {
    const fields: string[] = [];
    const values: any[] = [];

    if (partial.orders_id) {
      fields.push('orders_id = ?');
      values.push(partial.orders_id);
    }

    if (partial.orders_date) {
      fields.push('orders_date = ?');
      values.push(partial.orders_date);
    }

    if (fields.length === 0) return this.findById(id);
    values.push(id);
    const sql = `UPDATE orders SET ${fields.join(', ')} WHERE id = ?`;
    await this.pool().execute(sql, values);
    return this.findById(id);
  }

  async deleteOrders(id: number) {
    const [result] = await this.pool().execute<OkPacket>(
      'DELETE FROM orders WHERE id = ?',
      [id],
    );
    return result.affectedRows > 0;
  }
}