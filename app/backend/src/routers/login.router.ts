import { Router } from 'express';
import UserController from '../controllers/user.controller';
// import 'express-async-errors';

const loginRouter = Router();

// ROTA DO LOGIN
loginRouter.post('/', (require, response) => UserController.login(require, response));
loginRouter.get('/validate', (require, response) => UserController.validate(require, response));

export default loginRouter;
