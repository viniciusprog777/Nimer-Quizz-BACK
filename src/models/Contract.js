const { Model, DataTypes } = require("sequelize");

class Contract extends Model {
  static init(sequelize) {
    super.init(
      {
        contract_number: DataTypes.STRING,
        card_number: DataTypes.STRING,
        card_code: DataTypes.STRING,
        status_contract: DataTypes.BOOLEAN
      },
      {
        tableName: "contract",
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Institution, { foreignKey: "institution_id" });
  }
}
module.exports = Contract;
