const { Model, DataTypes } = require("sequelize");

class Option extends Model {
  static init(sequelize) {
    super.init(
      {
        description: DataTypes.STRING,
        image: DataTypes.STRING,
      },
      {
        tableName: "option",
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Question, { foreignKey: "question_id" });
    this.belongsToMany(models.Student, { through: "answer" });
  }
}
module.exports = Option;
