import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import statusCodes from '../statusCodes';
import UserService from '../services/users.service';

require('dotenv/config');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const secret = 'suaSenhaSecreta';

export default class UserController {
  constructor(private userService = new UserService()) {}

  generateToken = (id: number) => {
    const token = jwt.sign({ data: { id } }, secret, jwtConfig as any);
    return token;
  };

  public create = async (req:Request, res: Response) => {
    const user = req.body;
    const userCreated = await this.userService.create(user);
    const token = this.generateToken(userCreated.id as number);
    res.status(statusCodes.CREATED).json({ token });
  };

  public login = async (req:Request, res: Response) => {
    const user = req.body;
    if (!user.password) {
      return res.status(statusCodes.BAD_REQUEST).json({ message: '"password" is required' });
    }
    if (!user.username) {
      return res.status(statusCodes.BAD_REQUEST).json({ message: '"username" is required' });
    }
    const id = await this.userService.login(user);
    if (id) {
      const token = this.generateToken(id as number);
      return res.status(statusCodes.OK).json({ token });
    }
    return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Username or password invalid' });
  };
}