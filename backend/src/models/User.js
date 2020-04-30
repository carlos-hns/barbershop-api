const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

class User extends Model {
    static init(connection){
        super.init({
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
        }, {
            sequelize: connection,
            hooks: {
                "beforeCreate": async user => {
                    user.email = user.email.toLowerCase();
                    const hash = await bcrypt.hash(user.senha, 10);
                    user.senha = hash;
                }
            }
        });
    }
}

module.exports = User;