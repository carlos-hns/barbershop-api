'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('agendamentos', { 
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            nome_pessoa: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            dia: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            hora: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            servico: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            barbeiro: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            cliente: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
         });
    },

    down: (queryInterface, Sequelize) => {
          return queryInterface.dropTable('agendamentos');
    }
};
