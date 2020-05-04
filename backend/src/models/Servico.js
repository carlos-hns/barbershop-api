const { Model, DataTypes } = require("sequelize");

class Servico extends Model {
    static init(connection){
        super.init({
            servico: DataTypes.STRING,
            valor: DataTypes.DOUBLE,
        }, {
            sequelize: connection,
        });
    }
}

module.exports = Servico;