'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', { 
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
      homeTeam: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
				field: 'home_team', // interessante usar o field para renomear a coluna
				references: { // informa que é uma foreing key
					model: 'teams', // qual tabela está referenciada
					key: 'id', // qual coluna será usada como foreign key
				}
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'home_team_goals',
      },
			awayTeam: {
				type: Sequelize.INTEGER,
				allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
				field: 'away_team', // interessante usar o field para renomear a coluna
				references: { // informa que é uma foreing key
					model: 'teams', // qual tabela está referenciada
					key: 'id', // qual coluna será usada como foreign key
				}
			},
			awayTeamGoals: {
				type: Sequelize.INTEGER,
				allowNull: false,
        field: 'away_team_goals',
			},
      inProgress: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
        field: 'in_progress',
			},
		},);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};
