export default (db, DataTypes) => {
    const Ranking = db.define('ranking', {
        firstName: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        lastName: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        
        result: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        award: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });
    return Ranking

};