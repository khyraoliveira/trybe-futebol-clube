import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
// import 'express-async-errors';

const matchesRouter = Router();

// ROTA DO MATCH
matchesRouter.get('/', (require, response) => MatchesController.matches(require, response));
matchesRouter.post('/', (require, response) => MatchesController.matchesSave(require, response));
matchesRouter
  .patch('/:id/finish', (require, response) => MatchesController.matchesPatch(require, response));

export default matchesRouter;
