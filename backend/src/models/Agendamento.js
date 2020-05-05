const { Model, DataTypes } = require("sequelize");

// SITUACAO: SE FOI EXCLUIDO OU NÃO
//const EXCLUIDO = 0;
const NAO_EXCLUIDO = 1;

class Agendamento extends Model {
    static init(connection){
        super.init({
            nome_pessoa: DataTypes.STRING,
            dia: DataTypes.STRING,
            servico: DataTypes.INTEGER,
            barbeiro: DataTypes.INTEGER,
            cliente: DataTypes.INTEGER,
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
}

module.exports = Agendamento;