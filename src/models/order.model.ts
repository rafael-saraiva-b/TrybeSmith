import { Pool } from 'mysql2/promise';
import Order from '../interfaces/order.interface';

export default class OrderModel {
  public connection:Pool;

  constructor(connection:Pool) {
    this.connection = connection;
  }

  public async getAll():Promise<Order[]> {
    const result = await this.connection.execute(
      `SELECT o.id, o.user_id as userId, 
      ( SELECT JSON_ARRAYAGG(id) FROM Trybesmith.products as p WHERE p.order_id = o.id) 
      AS productsIds FROM Trybesmith.orders as o`,
    );
    const [rows] = result;
    return rows as Order[];
  }
}