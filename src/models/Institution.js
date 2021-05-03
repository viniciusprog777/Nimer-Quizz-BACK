const { Model, DataTypes } = require("sequelize");

class Institution extends Model {
  static init(sequelize) {
    super.init(
      {
        company_name: DataTypes.STRING,
        cnpf: DataTypes.STRING,
      },
      {
        tableName: "institution",
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id" });
    this.hasOne(models.Theme, { foreignKey: "institution_id" });
    this.hasMany(models.Contract, { foreignKey: "institution_id" });
    this.hasMany(models.Teacher, { foreignKey: "institution_id" });
    this.hasMany(models.Student, { foreignKey: "institution_id" });
    this.hasMany(models.Course, { foreignKey: "institution_id" });
  }
}
module.exports = Institution;
