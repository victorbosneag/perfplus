export default (db, DataTypes) => {
    const Participants = db.define('participant', {
        firstName: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        lastName: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
    return Participants

};