import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Match from '../../interfaces/match.interfaces';

class TeamModel extends Model {
  id!: number; // exclamação depois = not null
  teamName!: string;
  homeMatches: Match[];
  awayMatches: Match[];
}

TeamModel.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
  },
}, {
  sequelize: db,
  modelName: 'TeamModel',
  tableName: 'teams',
  timestamps: false,
  underscored: true,
});

export default TeamModel;
