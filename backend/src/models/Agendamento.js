const { Model, DataTypes } = require("sequelize");

class Agendamento extends Model {
    static init(connection){
        super.init({
            nome_pessoa: DataTypes.STRING,
            dia: DataTypes.STRING,
            servico: DataTypes.INTEGER,
            barbeiro: DataTypes.INTEGER,
            cliente: DataTypes.INTEGER,
        }, {
            sequelize: connection,
        });
    }
}

module.exports = Horario;