import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';

@Injectable()
export class OrdersService {
  constructor(private readonly db: DatabaseService) {}

  private get pool() {
    return this.db.getPool();
}

  async getAllorders() {
    return this.getAll();
  }

  async getordersById(id: number) {
    return this.findById(id);
  }

  async getAll() {
    const [rows] = await this.pool.execute<RowDataPacket[]>(
      'SELECT * FROM orders'
    );
    return rows;
  }

  async findById(id: number) {
    const [rows] = await this.pool.execute<RowDataPacket[]>(
      'SELECT * FROM orders WHERE id = ?',
      [id]
    );
    return rows[0];
    }

    async createOrders(orders_quality: string, orders_name: string) {
    const [result] = await this.pool.execute<OkPacket>(
        'INSERT INTO orders (orders_quality, orders_name) VALUES (?, ?)',
        [orders_quality, orders_name]
    );
    return { id: result.insertId, orders_quality, orders_name };
}

async updateOrders(id: number, data: {
    orders_quality?: string;
    orders_name?: string;
},) {
    const fields: string[] = [];
    const values: any[] = [];

    if (data.orders_quality) {
        fields.push('orders_quality = ?');
        values.push(data.orders_quality);
    }
    if (data.orders_name) {
        fields.push('orders_name = ?');
        values.push(data.orders_name);
    }

    if (fields.length === 0) return this.findById(id);

    values.push(id);
    await this.pool.execute(
        `UPDATE orders SET ${fields.join(', ')} WHERE id = ?`,
        values
    );

    return this.findById(id);
}

async deleteOrders(id: number) {
    const [result] = await this.pool.execute<OkPacket>(
        'DELETE FROM orders WHERE id = ?',
        [id]
    );
    return result.affectedRows > 0;
}
}