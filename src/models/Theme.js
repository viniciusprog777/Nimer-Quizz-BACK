const { Model, DataTypes } = require("sequelize");

class Theme extends Model {
    static init(sequelize){
        super.init(
            {
                logo_institution: DataTypes.STRING,
                color_primary: DataTypes.STRING,
                color_primary_dark: DataTypes.STRING,
                color_secundary: DataTypes.STRING,
                color_secundary_dark: DataTypes.STRING,

            },
            {
                tableName: "theme",
                sequelize,
            }
        );
    }
    static associate(models){
        this.belongsTo(models.Institution, { foreignKey: "institution_id"});
        
    }
}
module.exports = Theme;