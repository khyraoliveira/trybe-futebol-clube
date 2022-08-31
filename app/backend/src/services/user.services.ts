import * as bcrypt from 'bcryptjs';
import validationLogin from '../middleware/validationLogin.middleware';
import UserModel from '../database/models/user.model';
import JwtService from './jwt.services';

export default class UserServices {
  static async login(email:string, password:string): Promise<string> {
    if (!email || !password) {
      const error = new Error('All fields must be filled');
      error.name = 'ValidationError';
      throw error;
    }
    validationLogin.email(email);
    const user = await UserModel.findOne({
      // vai na tabela procurar o que está sendo requisitado:
      // trará tudo que está dentro de User c/ o email referido já 'E'xiste no body.
      // raw: true,
      where: { email },
    });

    // verifica se existe algum usuário com o email
    // ou se a senha tá cadastrada e é igual
    if (!user || !bcrypt.compareSync(password, user.password)) {
      const error = new Error('Incorrect email or password');
      error.name = 'Unauthorized';
      throw error;
    }
    const token = JwtService.createToken(user.email, user.id);
    return token;
  }

  static async validate(authorization:string): Promise<string> {
    const { id, email } = JwtService.validateToken(authorization);
    const idAutho = await UserModel.findByPk(id);
    if (!idAutho || idAutho.email !== email) {
      const error = new Error('Incorrect email or password');
      error.name = 'Unauthorized';
      throw error;
    }
    return idAutho.role;
  }
}
