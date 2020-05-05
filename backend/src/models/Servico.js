const { Model, DataTypes } = require("sequelize");

// SITUACAO: SE FOI EXCLUIDO OU NÃO
//const EXCLUIDO = 0;
const NAO_EXCLUIDO = 1;

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
                        servico.situacao = NAO_EXCLUIDO;
                    }
                }
            }
        });
    }


}

module.exports = Servico;