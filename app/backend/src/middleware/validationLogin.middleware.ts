import 'express-async-errors';

export default class validationLogin {
  static async email(email:string) {
    const regex = /\S+@\S+\.\S+/;
    const validEmail = regex.test(email);
    if (!validEmail) {
      const error = new Error('Incorrect email or password');
      error.name = 'Unauthorized';
      throw error;
    }
  }
}
