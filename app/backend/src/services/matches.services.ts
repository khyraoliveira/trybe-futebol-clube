import MatchesInterface from '../interfaces/match.interfaces';
import MatchesModel from '../database/models/matches.model';
import TeamModel from '../database/models/team.model';

export default class TeamServices {
  // static updateMatches: any;
  static async matches(): Promise<MatchesInterface[]> {
    const matches = await MatchesModel.findAll({ include: [{
      model: TeamModel, as: 'teamHome' }, { model: TeamModel, as: 'teamAway' }] });
    return matches;
    // vai na tabela procurar o que está sendo requisitado:
    // trará tudo que está dentro de Matches.
  }

  // REQ23, 25, 26
  static async MSave(homeTeam:number, awayTeam:number, homeTeamGoals:number, awayTeamGoals:number)
    : Promise<MatchesInterface> {
    if (homeTeam === awayTeam) {
      const error = new Error('It is not possible to create a match with two equal teams');
      error.name = 'Unauthorized';
      throw error;
    }

    const teamNotTable = await TeamModel.findAll();
    const someHome = teamNotTable.some((elemento) => homeTeam === elemento.id);
    const someAway = teamNotTable.some((elemento) => awayTeam === elemento.id);
    if (!someHome || !someAway) {
      const error = new Error('There is no team with such id!');
      error.name = 'NotFoundError';
      throw error;
    }

    const matchesSave = await MatchesModel
      .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true });
    return matchesSave;
  }

  // REQ24
  static async matchPatch(id:string): Promise<void> {
    await MatchesModel.update({ inProgress: false }, { where: { id } });
  }

  // REQ 28
  static updateMatches = async (
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) => {
    const match = await MatchesModel.findByPk(id);
    if (!match) {
      throw new Error('There is no match with such id!');
    }
    await MatchesModel.update({
      homeTeamGoals,
      awayTeamGoals,
    }, { where: { id } });
  };
}
