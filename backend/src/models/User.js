const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");


const constantes = require("../config/contantes.json");

class User extends Model {
    static init(connection){
        super.init({
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            nivel_acesso: DataTypes.INTEGER,
            situacao: DataTypes.BOOLEAN,
        }, {
            sequelize: connection,
            hooks: {
                "beforeCreate": async user => {
                    user.email = user.email.toLowerCase();
                    const hash = await bcrypt.hash(user.senha, 10);
                    user.senha = hash;

                    if (user.nivel_acesso == null){
                        user.nivel_acesso = constantes.NIVEL_ACESSO.CLIENTE;
                    }

                    if (user.situacao == null){
                        user.situacao = constantes.SITUACAO.NAO_EXCLUIDO;
                    }
                }
            }
        });
    }

    static associate(models){
        this.hasMany(models.Agendamento, {foreignKey: "cliente_id", as: "agendamentos_cliente"});
        this.hasMany(models.Agendamento, {foreignKey: "barbeiro_id", as: "agendamentos_barbeiro"});
    }

}

module.exports = User;