import { Router } from 'express';
import UserController from '../controllers/user.controller';
// import 'express-async-errors';

const loginRouter = Router();

// ROTA DO LOGIN
loginRouter.post('/', UserController.login);

export default loginRouter;
