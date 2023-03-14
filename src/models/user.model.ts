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

  public async login(user:User):Promise<boolean | number | undefined> { 
    const result = await this.connection.execute<ResultSetHeader>(`
    SELECT * FROM Trybesmith.users WHERE username = ?`, [user.username]);
    const [rows] = result as unknown[];
    const [userDB] = rows as User[];
    if (!userDB || userDB.password !== user.password) {
      return false;
    }
    return userDB.id;
  }
}