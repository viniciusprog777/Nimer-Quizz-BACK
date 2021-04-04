const { Model, DataTypes } = require("sequelize");

class Teacher extends Model {
    static init(sequelize){
        super.init(
            {
                name: DataTypes.STRING,
                description: DataTypes.STRING,
                email: DataTypes.STRING,
                password: DataTypes.STRING,
                image: DataTypes.STRING,
                date_birthday: DataTypes.STRING
            },
            {
                tableName: "teacher",
                sequelize,
            }
        );
    }
    static associate(models){
        this.belongsTo(models.Institution, { foreignKey: "institution_id"});
        this.hasMany(models.Class, { foreignKey: "teacher_id"});
    }
}
module.exports = Teacher;