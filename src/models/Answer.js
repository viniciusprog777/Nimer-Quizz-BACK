const { Model, DataTypes } = require("sequelize");

class Answer extends Model {
  static init(sequelize) {
    super.init(
      {
        
      },
      {
        tableName: "answer",
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: "student_id" });
    this.belongsTo(models.Choice, { foreignKey: "choice_id" });
    this.belongsTo(models.Quizz, { foreignKey: "quizz_id" });
    

  }
}
module.exports = Answer;
