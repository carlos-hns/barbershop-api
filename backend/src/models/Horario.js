const { Model, DataTypes } = require("sequelize");

class Horario extends Model {
    static init(connection){
        super.init({
            horario: DataTypes.STRING,
            segunda: DataTypes.BOOLEAN,
            terca: DataTypes.BOOLEAN,
            quarta: DataTypes.BOOLEAN,
            quinta: DataTypes.BOOLEAN,
            sexta: DataTypes.BOOLEAN,
            sabado: DataTypes.BOOLEAN,
            domingo: DataTypes.BOOLEAN,
        }, {
            sequelize: connection,
        });
    }
}

module.exports = Horario;