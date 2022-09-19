import { Request, Response } from 'express';
import MatchesService from '../services/matches.services';
import JwtService from '../services/jwt.services';

export default class MatchesController {
  static async matches(require: Request, response: Response) {
    const matches = await MatchesService.matches();

    response.status(200).json(matches);
  }

  // REQ23
  static async matchesSave(require: Request, response: Response) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = require.body;
    // REQ 27
    const { authorization } = require.headers;
    if (!authorization) {
      throw new Error();
    }
    JwtService.validateToken(authorization);
    const matches = await MatchesService
      .MSave(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);

    response.status(201).json(matches);
  }

  // REQ24
  static async matchesPatch(require: Request, response: Response) {
    const { id } = require.params;
    await MatchesService.matchPatch(id);

    response.status(200).json({ message: 'Finished' });
  }
}
