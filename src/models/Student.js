const { Model, DataTypes } = require("sequelize");

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        date_birthday: DataTypes.STRING,
      },
      {
        tableName: "student",
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Institution, { foreignKey: "institution_id" });
    this.belongsTo(models.User, { foreignKey: "user_id" });
    this.belongsToMany(models.Class, { through: "class_student" });
    this.belongsToMany(models.Course, { through: "course_student" });
    this.belongsToMany(models.Achievement, { through: "student_achievement" });
    this.belongsToMany(models.Choice, { through: "answer" });

  }
}
module.exports = Student;
