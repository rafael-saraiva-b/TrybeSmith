import { Pool, ResultSetHeader } from 'mysql2/promise';
import User from '../interfaces/user.interface';

export default class UserModel {
  public connection:Pool;

  constructor(connection:Pool) {
    this.connection = connection;
  }

  public async create(user:User):Promise<User> {
    const { level, password, username, vocation } = user;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.users(level, password, username, vocation) VALUES (?,?,?,?)',
      [level, password, username, vocation],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, level, username, vocation };
  }
}