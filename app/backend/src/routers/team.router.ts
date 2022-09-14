import { Router } from 'express';
import TeamController from '../controllers/team.controller';
// import 'express-async-errors';

const teamRouter = Router();

// ROTA DO TEAM
teamRouter.get('/', (require, response) => TeamController.team(require, response));

export default teamRouter;
