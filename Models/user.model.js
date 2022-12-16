import datavaluesConfig from "../Config/datavalues.config.js";
export default (db, DataTypes) => {
    const User = db.define('user', {
        username: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        role: {
            type: DataTypes.TEXT,
            allowNull: false,
            isIn: [datavaluesConfig.roles]
        }
    });
    return User

};

