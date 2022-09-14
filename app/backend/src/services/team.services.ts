import TeamInterface from '../interfaces/team.interfaces';
import TeamModel from '../database/models/team.model';

export default class TeamServices {
  static async team(): Promise<TeamInterface[]> {
    const team = await TeamModel.findAll();
    return team;
    // vai na tabela procurar o que está sendo requisitado:
    // trará tudo que está dentro de Team.
  }

  static async teamId(id: string): Promise<TeamInterface | null> {
    const teamByID = await TeamModel.findByPk(id);
    return teamByID;
    // vai na tabela procurar o que está sendo requisitado:
    // trará o ID que está dentro do Team.
  }
}
