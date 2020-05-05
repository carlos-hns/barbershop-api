const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../models/User");
const Horario = require("../models/Horario");
const Servico = require("../models/Servico");
const Agendamento = require("../models/Agendamento");

const connection = new Sequelize(dbConfig);

User.init(connection);
Horario.init(connection);
Servico.init(connection);
Agendamento.init(connection);


//User.associate(connection.models);
//Horario.associate(connection.models);
//Servico.associate(connection.models);
Agendamento.associate(connection.models);

module.exports = connection;