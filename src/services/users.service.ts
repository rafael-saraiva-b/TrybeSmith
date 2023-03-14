import connection from '../models/connection';
import UserModel from '../models/user.model';
import User from '../interfaces/user.interface';

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async create(user:User): Promise<User> {
    const result = await this.model.create(user);
    return result;
  }

  public async login(user:User): Promise<boolean | number | undefined> {
    const result = await this.model.login(user);
    return result;
  }
}