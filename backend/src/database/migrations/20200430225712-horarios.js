'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('horarios', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            horario: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            segunda: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            terca: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            quarta: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            quinta: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            sexta: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            sabado: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            domingo: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('horarios');
    }
};
