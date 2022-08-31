import { Request, Response } from 'express';
import UserService from '../services/user.services';

export default class UserController {
  static async login(require: Request, response: Response) {
    const { email, password } = require.body;

    const token = await UserService.login(email, password);

    response.status(200).json({ token });
  }

  static async validate(require: Request, response: Response) {
    const { authorization } = require.headers;

    if (!authorization) {
      const error = new Error('Incorrect email or password');
      error.name = 'Unauthorized';
      throw error;
    }
    const role = await UserService.validate(authorization);

    response.status(200).json({ role });
  }
}
