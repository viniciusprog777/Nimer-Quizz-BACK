const { Model, DataTypes } = require("sequelize");

class Teacher extends Model {
  static init(sequelize) {
    super.init(
      {
        description: DataTypes.STRING,
        date_birthday: DataTypes.STRING,
      },
      {
        tableName: "teacher",
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Institution, { foreignKey: "institution_id" });
    this.belongsTo(models.User, { foreignKey: "user_id" });
    this.hasMany(models.Class, { foreignKey: "teacher_id" });
    this.hasMany(models.Quizz, { foreignKey: "teacher_id" });
    this.hasMany(models.Question, { foreignKey: "teacher_id" });
  }
}
module.exports = Teacher;
