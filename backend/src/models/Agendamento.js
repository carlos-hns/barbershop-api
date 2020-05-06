const { Model, DataTypes } = require("sequelize");

const constantes = require("../config/contantes.json");

class Agendamento extends Model {
    static init(connection){
        super.init({
            nome_pessoa: DataTypes.STRING,
            dia: DataTypes.STRING,
            situacao: DataTypes.BOOLEAN,
        }, {
            sequelize: connection,
            hooks: {
                "beforeCreate": agendamento => {
                    if (agendamento.situacao == null){
                        agendamento.situacao = constantes.SITUACAO.NAO_EXCLUIDO;
                    }
                }
            }
        });
    }

    static associate(models){
        this.belongsTo(models.User, {foreignKey: "cliente_id", as: "cliente"});
        this.belongsTo(models.User, {foreignKey: "barbeiro_id", as: "barbeiro"});
        this.belongsTo(models.Horario, {foreignKey: "horario_id", as: "horario"});
        this.belongsTo(models.Servico, {foreignKey: "servico_id", as: "servico"});
    }
}

module.exports = Agendamento;