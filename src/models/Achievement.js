const { Model, DataTypes } = require("sequelize");

class Achievement extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        insignia: DataTypes.STRING,
      },
      {
        tableName: "achievement",
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Institution, { foreignKey: "institution_id" });
    this.belongsTo(models.Course, { foreignKey: "course_id" });
    this.belongsToMany(models.Student, { through: "student_achievement" });
  }
}
module.exports = Achievement;
