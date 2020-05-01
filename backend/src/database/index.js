const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../models/User");
const Horario = require("../models/Horario");

const connection = new Sequelize(dbConfig);

User.init(connection);
Horario.init(connection);

module.exports = connection;