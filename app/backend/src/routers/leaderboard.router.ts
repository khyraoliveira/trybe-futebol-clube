import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';
// import 'express-async-errors';

const leaderboardRouter = Router();

// ROTA DO LEADERBOARD
// REQ 33
leaderboardRouter
  .get('/', (require, response) => LeaderboardController.geral(require, response));
// REQ29 a requisição tipo 'GET' e o endpoint '/home'
leaderboardRouter
  .get('/home', (require, response) => LeaderboardController.home(require, response));
// REQ 31
leaderboardRouter
  .get('/away', (require, response) => LeaderboardController.away(require, response));

export default leaderboardRouter;
