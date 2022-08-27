import bcrypt = require('bcryptjs');
import UserModel from '../database/models/user.model';
import JwtService from './jwt.services';

export default class UserServices {
  static async login(email:string, password:string): Promise<string> {
    const verificarUsuario = await UserModel.findOne({
      // vai na tabela procurar o que está sendo requisitado:
      // trará tudo que está dentro de User c/ o email referido já 'E'xiste no body.
      where: { email },
    });

    // verifica se existe algum usuário com o email
    // ou se a senha tá cadastrada e é igual
    if (!verificarUsuario || !bcrypt.compareSync(password, verificarUsuario.password)) {
      const error = new Error('Incorrect email or password');
      error.name = 'Unauthorized';
      throw error;
    }

    const user = await UserModel.create({ email });
    const token = JwtService.createToken(user);
    return token;
  };
}
