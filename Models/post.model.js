export default (db, DataTypes) => {
    const Posts = db.define('post', {
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
    return Posts

};