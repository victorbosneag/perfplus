export default (db, DataTypes) => {
    const Rankings = db.define('ranking', {
        
        result: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        award: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });
    return Rankings;

};