const { Model, DataTypes } = require("sequelize");

class Quizz extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        status_quizz: DataTypes.STRING,
        socket_id: DataTypes.STRING
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
    this.belongsToMany(models.Student, { through: "answer" });
    this.belongsToMany(models.Choice, { through: "answer" });
  }
}
module.exports = Quizz;
