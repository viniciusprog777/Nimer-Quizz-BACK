const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        image: DataTypes.STRING,
        status: DataTypes.BOOLEAN,
      },
      {
        tableName: "user",
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Level, { foreignKey: "level_id" });
    this.hasOne(models.Institution, { foreignKey: "user_id" });
    this.hasOne(models.Teacher, { foreignKey: "user_id" });
    this.hasOne(models.Student, { foreignKey: "user_id" });
  }
}
module.exports = User;
