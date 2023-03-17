export default (db, DataTypes) => {
    const ContestConfig = db.define(
      "contestconfig",
      {
        hasAnswers: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        hasSubjects: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        }
      },
      {
        paranoid: true,
      }
    );
    return ContestConfig;
  };
  