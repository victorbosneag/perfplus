export default (db, DataTypes) => {
  const Highschool = db.define("highschool", {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    city: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  return Highschool;
};
