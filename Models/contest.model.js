export default (db, DataTypes) => {
  const Contest = db.define(
    "contest",
    {
      contestName: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      subject: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      ackMinister: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      paranoid: true,
    }
  );
  return Contest;
};
