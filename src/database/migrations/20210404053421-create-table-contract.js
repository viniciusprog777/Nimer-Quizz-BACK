"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("contract", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      contract_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      card_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      card_code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      status_contract: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      institution_id: {
        type: Sequelize.INTEGER,
        allownull: true,
        references: {
          model: "institution",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("contract");
  },
};
