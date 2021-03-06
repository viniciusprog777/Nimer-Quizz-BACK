const { Model, DataTypes } = require("sequelize");

class Course extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        image: DataTypes.STRING,
      },
      {
        tableName: "course",
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Institution, { foreignKey: "institution_id" });
    this.belongsToMany(models.Student, { through: "course_student" });
    this.belongsToMany(models.Teacher, {through: "course_teacher"})
    this.hasMany(models.Class, { foreignKey: "course_id" });

  }
}
module.exports = Course;
