export default (db, DataTypes) => {
    const Rankings = db.define('ranking', {
        participantId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
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
    return Rankings;

};