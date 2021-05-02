const { Model, DataTypes } = require("sequelize");

class Answer extends Model {
    static init(sequelize){
        super.init(
            {
                description: DataTypes.STRING,
                image: DataTypes.STRING,

            },
            {
                tableName: "answer",
                sequelize,
            }
        );
    }
    static associate(models){
        this.belongsTo(models.Teacher, { foreignKey: "question_id"});
        
    }
}
module.exports = Answer;