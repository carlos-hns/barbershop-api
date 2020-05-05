const { Model, DataTypes } = require("sequelize");

// SITUACAO: SE FOI EXCLUIDO OU NÃO
//const EXCLUIDO = 0;
const NAO_EXCLUIDO = 1;

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
                        agendamento.situacao = NAO_EXCLUIDO;
                    }
                }
            }
        });
    }

    static associate(models){
        this.belongsTo(models.User, {foreignKey: "cliente_id", as: "agendamento_cliente"});
        this.belongsTo(models.User, {foreignKey: "barbeiro_id", as: "agendamento_barbeiro"});
        this.belongsTo(models.Horario, {foreignKey: "horario_id", as: "agendamento_horario"});
        this.belongsTo(models.Servico, {foreignKey: "servico_id", as: "agendamento_servico"});
    }
}

module.exports = Agendamento;