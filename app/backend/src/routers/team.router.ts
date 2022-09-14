import { Router } from 'express';
import TeamController from '../controllers/team.controller';
// import 'express-async-errors';

const teamRouter = Router();

// ROTA DO TEAM
teamRouter.get('/', (require, response) => TeamController.team(require, response));
teamRouter.get('/:id', (require, response) => TeamController.teamId(require, response));

export default teamRouter;
