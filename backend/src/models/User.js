const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

class User extends Model {
    static init(connection){
        super.init({
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            nivel_acesso: DataTypes.INTEGER,
        }, {
            sequelize: connection,
            hooks: {
                "beforeCreate": async user => {
                    user.email = user.email.toLowerCase();
                    const hash = await bcrypt.hash(user.senha, 10);
                    user.senha = hash;

                    if (user.nivel_acesso == null){
                        user.nivel_acesso = 0;
                    }

                }
            }
        });
    }
}

module.exports = User;