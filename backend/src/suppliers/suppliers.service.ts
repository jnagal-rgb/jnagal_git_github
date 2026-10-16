import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SuppliersService {
  constructor(private readonly db: DatabaseService) {}

  private get pool() {
    return this.db.getPool();
}

  async getAllsuppliers() {
    return this.getAll();
  }

  async getsuppliersById(id: number) {
    return this.findById(id);
  }

  async getAll() {
    const [rows] = await this.pool.execute<RowDataPacket[]>(
      'SELECT * FROM suppliers'
    );
    return rows;
  }

  async findById(id: number) {
    const [rows] = await this.pool.execute<RowDataPacket[]>(
      'SELECT * FROM suppliers WHERE id = ?',
      [id]
    );
    return rows[0];
    }

    async createSuppliers(type_name: string, type_address: string) {
    const [result] = await this.pool.execute<OkPacket>(
        'INSERT INTO suppliers (type_name, type_address) VALUES (?, ?)',
        [type_name, type_address]
    );
    return { id: result.insertId, type_name, type_address };
}

async updateSuppliers(id: number, data: {
    type_name?: string;
    type_address?: string;
}) {
    const fields: string[] = [];
    const values: any[] = [];

    if (data.type_name) {
        fields.push('type_name = ?');
        values.push(data.type_name);
    }
    if (data.type_address) {
        fields.push('type_address = ?');
        values.push(data.type_address);
    }

    if (fields.length === 0) return this.findById(id);

    values.push(id);
    await this.pool.execute(
        `UPDATE suppliers SET ${fields.join(', ')} WHERE id = ?`,
        values
    );

    return this.findById(id);
}

async deleteSuppliers(id: number) {
    const [result] = await this.pool.execute<OkPacket>(
        'DELETE FROM suppliers WHERE id = ?',
        [id]
    );
    return result.affectedRows > 0;
}
}