const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

// NIVEL DE ACESSO
const CLIENTE = 0;
//const BARBEIRO = 1;
//const PROPRIETARIO = 1;

// SITUACAO: SE FOI EXCLUIDO OU NÃO
//const EXCLUIDO = 0;
const NAO_EXCLUIDO = 1;

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
                        user.nivel_acesso = CLIENTE;
                    }

                    if (user.situacao == null){
                        user.situacao = NAO_EXCLUIDO;
                    }
                }
            }
        });
    }


}

module.exports = User;