import connection from '../models/connection';
import Order from '../interfaces/order.interface';
import OrderModel from '../models/order.model';

export default class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async getAll():Promise<Order[]> {
    const orders = this.model.getAll();
    return orders;
  }
}