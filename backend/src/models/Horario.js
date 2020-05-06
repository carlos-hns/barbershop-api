const { Model, DataTypes } = require("sequelize");

const constantes = require("../config/contantes.json");

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
                        horario.situacao = constantes.SITUACAO.NAO_EXCLUIDO;
                    }
                }
            }
        });
    }

    static associate(models){
        this.hasMany(models.Agendamento, {foreignKey: "horario_id", as: "agendamentos_horario"});
    }    
}

module.exports = Horario;