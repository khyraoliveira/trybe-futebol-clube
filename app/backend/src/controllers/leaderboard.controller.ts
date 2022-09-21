import { Request, Response } from 'express';
// import LeaderboardI from 'src/interfaces/leaderboard.interfaces';
import LeaderboardService from '../services/leaderboard.services';
// import JwtService from '../services/jwt.services';

export default class LeaderboardController {
  static async home(request: Request, response: Response): Promise<void> {
    const retorno = await LeaderboardService.home();
    response.status(200).json(retorno);
  }

  // REQ 31
  static async away(request: Request, response: Response): Promise<void> {
    const retorno = await LeaderboardService.away();
    response.status(200).json(retorno);
  }

  // REQ 33
  static async geral(request: Request, response: Response): Promise<void> {
    const retorno = await LeaderboardService.geral();
    response.status(200).json(retorno);
  }
}
