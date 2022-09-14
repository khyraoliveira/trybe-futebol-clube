import { Request, Response } from 'express';
import TeamService from '../services/team.services';

export default class TeamController {
  static async team(require: Request, response: Response) {
    const teams = await TeamService.team();

    response.status(200).json(teams);
  }

  static async teamId(require: Request, response: Response) {
    const { id } = require.params;
    const teamId = await TeamService.teamId(id);

    response.status(200).json(teamId);
  }
}
