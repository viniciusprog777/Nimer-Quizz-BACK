const { Model, DataTypes } = require("sequelize");

class Student extends Model {
    static init(sequelize){
        super.init(
            {
                name: DataTypes.STRING,
                email: DataTypes.STRING,
                password: DataTypes.STRING,
                image: DataTypes.STRING,
                date_birthday: DataTypes.STRING
            },
            {
                tableName: "student",
                sequelize,
            }
        );
    }
    static associate(models){
        this.belongsTo(models.Institution, { foreignKey: "institution_id"});
        this.belongsToMany(models.Class, { through: "class_student"});
    }
}
module.exports = Student;