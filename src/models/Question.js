const { Model, DataTypes } = require("sequelize");

class Question extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        image: DataTypes.STRING,
      },
      {
        tableName: "question",
        sequelize,
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Option, { foreignKey: "question_id" });
    this.belongsTo(models.Teacher, { foreignKey: "teacher_id" });
    this.belongsToMany(models.Quizz, { through: "quizz_question" });
  }
}
module.exports = Question;
