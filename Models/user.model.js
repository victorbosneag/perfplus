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
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
    return User

};

