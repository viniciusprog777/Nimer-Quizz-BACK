const { Model, DataTypes } = require("sequelize");

class Quizz extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        tableName: "quizz",
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Teacher, { foreignKey: "teacher_id" });
    this.belongsTo(models.Class, { foreignKey: "class_id" });
    this.belongsToMany(models.Quizz, { foreignKey: "quizz_id" });
  }
}
module.exports = Quizz;
