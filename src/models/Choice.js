const { Model, DataTypes } = require("sequelize");

class Choice extends Model {
  static init(sequelize) {
    super.init(
      {
        description: DataTypes.STRING,
        image: DataTypes.STRING,
        correct_option: DataTypes.BOOLEAN,
      },
      {
        tableName: "choice",
        sequelize, 
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Question, { foreignKey: "question_id" });
    this.belongsToMany(models.Student, { through: "answer" });
    this.belongsToMany(models.Quizz, { through: "answer" });
  }
}
module.exports = Choice;
