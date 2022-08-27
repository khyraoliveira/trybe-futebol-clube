import jwt = require('jsonwebtoken');
// import { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';

const jwtsecret:string = process.env.JWT_SECRET || 'secreto';

export default class JwtService {
  static createToken = (payload:{ email:string,
    username:string, role:string, password:string }):string => {
    const token = jwt.sign(payload, jwtsecret, {
      algorithm: 'HS256',
      expiresIn: '3d',
    });
    return token;
  };
}
