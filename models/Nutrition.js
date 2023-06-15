const Nutrition = function (Sequelize, DataTypes) {
  return Sequelize.define(
    "Nutrition",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      foodName: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      HowManyEat: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      HowManyKcal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      HowManyProtein: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "Nutrition",
      freezeTableName: true,
      timestamps: false,
    }
  );
  //return model;
};

module.exports = Nutrition;
