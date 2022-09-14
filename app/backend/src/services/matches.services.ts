import MatchesInterface from '../interfaces/match.interfaces';
import MatchesModel from '../database/models/matches.model';
import TeamModel from '../database/models/team.model';

export default class TeamServices {
  static async matches(): Promise<MatchesInterface[]> {
    const matches = await MatchesModel.findAll({ include: [{
      model: TeamModel, as: 'teamHome' }, { model: TeamModel, as: 'teamAway' }] });
    return matches;
    // vai na tabela procurar o que está sendo requisitado:
    // trará tudo que está dentro de Matches.
  }
}
