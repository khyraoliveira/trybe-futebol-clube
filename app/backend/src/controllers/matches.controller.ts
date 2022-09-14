import { Request, Response } from 'express';
import MatchesService from '../services/matches.services';

export default class MatchesController {
  static async matches(require: Request, response: Response) {
    const matches = await MatchesService.matches();

    response.status(200).json(matches);
  }

  static async matchesSave(require: Request, response: Response) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = require.body;
    const matches = await MatchesService
      .matchesSave(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);

    response.status(201).json(matches);
  }
}
