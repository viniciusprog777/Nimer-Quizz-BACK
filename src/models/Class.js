const { Model, DataTypes } = require("sequelize");

class Class extends Model {
    static init(sequelize){
        super.init(
            {
                name: DataTypes.STRING,
            },
            {
                tableName: "class",
                sequelize,
            }
        );
    }
    static associate(models){
        this.belongsTo(models.Teacher, { foreignKey: "teacher_id"});
        this.belongsTo(models.Course, { foreignKey: "course_id"});
        this.belongsToMany(models.Student, { through: "class_student"});
    }
}
module.exports = Class;