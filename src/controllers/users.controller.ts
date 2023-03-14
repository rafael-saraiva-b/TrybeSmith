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

  public create = async (req:Request, res: Response) => {
    const user = req.body;
    const userCreated = await this.userService.create(user);
    const token = jwt.sign({ data: { ...userCreated } }, secret, jwtConfig as any);
    res.status(statusCodes.CREATED).json({ token });
  };
}