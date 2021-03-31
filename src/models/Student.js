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

    }
}
module.exports = Student;