const { Model, DataTypes } = require("sequelize");

const constantes = require("../config/contantes.json");

class Servico extends Model {
    static init(connection){
        super.init({
            nome: DataTypes.STRING,
            valor: DataTypes.DOUBLE,
            situacao: DataTypes.BOOLEAN,
        }, {
            sequelize: connection,
            hooks: {
                "beforeCreate": servico => {
                    if (servico.situacao == null){
                        servico.situacao = constantes.SITUACAO.NAO_EXCLUIDO;
                    }
                }
            }
        });
    }

    static associate(models){
        this.hasMany(models.Agendamento, {foreignKey: "servico_id", as: "agendamentos_servico"});
    }
}

module.exports = Servico;