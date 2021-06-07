const { Model, DataTypes } = require("sequelize");

class Quizz extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        status_quizz: DataTypes.STRING
      },
      {
        tableName: "quizz",
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Teacher, { foreignKey: "teacher_id" });
    this.belongsTo(models.Class, { foreignKey: "class_id" });
    this.belongsToMany(models.Question, { through: "quizz_question" });
  }
}
module.exports = Quizz;