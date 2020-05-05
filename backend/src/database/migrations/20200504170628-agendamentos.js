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
            hora_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: "horarios", key: "id"},
                onUpdate: "CASCADE",
                /* Com o atributo de situacao não vou ter perda de dados!
                 * Sendo assim, uma exclusão de dado seria permanente e de consenso do dono...
                 * Ou seja, excluir um desses servicos/horarios/users seria uma ação sem volta...
                 */
                onDelete: "CASCADE",
            },
            servico_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: "servicos", key: "id"},
                onUpdate: "CASCADE",
                // MESMA LÓGICA DE CIMA
                onDelete: "CASCADE",
            },
            barbeiro_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: "users", key: "id"},
                onUpdate: "CASCADE",
                // MESMA LÓGICA DE CIMA
                onDelete: "CASCADE",
            },
            cliente_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: "users", key: "id"},
                onUpdate: "CASCADE",
                // MESMA LÓGICA DE CIMA
                onDelete: "CASCADE",
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
