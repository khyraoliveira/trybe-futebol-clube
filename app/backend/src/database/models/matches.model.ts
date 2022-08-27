import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import TeamModel from './team.model';

class MatchesModel extends Model {
  id!: number; // exclamação depois = not null
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

MatchesModel.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: true,
  },
  awayTeam: {
    type: INTEGER,
  },
  awayTeamGoals: {
    type: INTEGER,
  },
  inProgress: {
    type: BOOLEAN,
  },
}, {
  sequelize: db,
  modelName: 'MatchesModel',
  tableName: 'matches',
  underscored: true,
  timestamps: false,
});

TeamModel.hasMany(MatchesModel, { foreignKey: 'homeTeam', as: 'homeMatches' }); // são as partidas do dono da casa
TeamModel.hasMany(MatchesModel, { foreignKey: 'awayTeam', as: 'awayMatches' }); // são as partidas do visitante

MatchesModel.belongsTo(TeamModel, { as: 'teamHome', foreignKey: 'homeTeam' });
MatchesModel.belongsTo(TeamModel, { as: 'teamAway', foreignKey: 'awayTeam' });

export default MatchesModel;
