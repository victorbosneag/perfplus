export default (db, DataTypes) => {
  const Participants = db.define("participant", {
    firstName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    result: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    award: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
  return Participants;
};
