import { Request, Response } from 'express';
import UserService from '../services/user.services';

export default class UserController {
  static async login(require: Request, response: Response) {
    const { email, password } = require.body;

    const token = await UserService.login(email, password);

    response.status(200).json({ token });
  }
}
