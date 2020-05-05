const { Model, DataTypes } = require("sequelize");

// SITUACAO: SE FOI EXCLUIDO OU NÃO
//const EXCLUIDO = 0;
const NAO_EXCLUIDO = 1;

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
            situacao: DataTypes.BOOLEAN,
        }, {
            sequelize: connection,
            hooks: {
                "beforeCreate": horario => {
                    if (horario.situacao == null){
                        horario.situacao = NAO_EXCLUIDO;
                    }
                }
            }
        });
    }
}

module.exports = Horario;