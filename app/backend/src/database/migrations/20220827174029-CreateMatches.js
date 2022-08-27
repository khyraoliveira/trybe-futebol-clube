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
        type: Sequelize.NUMBER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
				field: 'home_team', // interessante usar o field para renomear a coluna
				references: { // informa que é uma foreing key
					model: 'TeamModel', // qual tabela está referenciada
					key: 'id', // qual coluna será usada como foreign key
				}
      },
      homeTeamGoals: {
        type: Sequelize.NUMBER,
        allowNull: true
      },
			awayTeam: {
				type: Sequelize.NUMBER,
				allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
				field: 'away_team', // interessante usar o field para renomear a coluna
				references: { // informa que é uma foreing key
					model: 'TeamModel', // qual tabela está referenciada
					key: 'id', // qual coluna será usada como foreign key
				}
			},
			awayTeamGoals: {
				type: Sequelize.NUMBER,
				allowNull: false,
			},
      inProgress: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
			},
		},);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};
