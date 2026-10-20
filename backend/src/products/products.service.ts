import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class ProductsService {
  constructor(private db: DatabaseService) {}

  private pool = () =>  this.db.getPool();

  async createProducts(type_samsung: string, type_iphone: string, type_vivo: string) {
    // const hashed = await bcrypt.hash(password, 10);

    const [result] = await this.pool().execute<OkPacket>(
      'INSERT INTO productss (type_samsung, type_iphone, type_vivo) VALUES (?, ?, ?)',
      [type_samsung, type_iphone, type_vivo],
    );
    return { id: result.insertId, type_samsung, type_iphone, type_vivo};
  }

  async findById(id: number) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM productss WHERE id = ?',
      [id],
    );
    return rows[0];
  }

  async getAll() {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM productss',
    );
    return rows;
  }

  async updateProducts(
    id: number,
    partial: { type_samsung?: string; type_iphone?: string; type_vivo?: string },
  ) {
    const fields: string[] = [];
    const values: any[] = [];

    if (partial.type_samsung) {
      fields.push('type_samsung = ?');
      values.push(partial.type_samsung);
    }

    if (partial.type_iphone) {
      fields.push('type_iphone = ?');
      values.push(partial.type_iphone);
    }

    if (partial.type_vivo) {
      fields.push('type_vivo = ?');
      values.push(partial.type_vivo);
    }

    if (fields.length === 0) return this.findById(id);
    values.push(id);
    const sql = `UPDATE productss SET ${fields.join(', ')} WHERE id = ?`;
    await this.pool().execute(sql, values);
    return this.findById(id);
  }

  async deleteProducts(id: number) {
    const [result] = await this.pool().execute<OkPacket>(
      'DELETE FROM productss WHERE id = ?',
      [id],
    );
    return result.affectedRows > 0;
  }
}