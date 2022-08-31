import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const jwtsecret:jwt.Secret = process.env.JWT_SECRET || 'secreto';

export default class JwtService {
  static createToken = (email:string, id:number):string => {
    const token = jwt.sign({ email, id }, jwtsecret);
    return token;
  };

  static validateToken = (token:string):jwt.JwtPayload => {
    try {
      const data = jwt.verify(token, jwtsecret);
      return data as jwt.JwtPayload;
    } catch (_e) {
      // cria um novo erro
      // será a msg que irá retornar, a do 'new Error'
      const error = new Error('Token must be a valid token');
      error.name = 'Unauthorized';
      throw error;
    }
  };
}
