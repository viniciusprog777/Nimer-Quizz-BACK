'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("theme", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      logo_institution:{
        type: Sequelize.STRING,
      },
      color_primary: {
        type: Sequelize.STRING,
      },
      color_primary_dark:{
        type: Sequelize.STRING,
      },
      color_secundary: {
        type: Sequelize.STRING,
      },
      color_secundary_dark: {
        type: Sequelize.STRING
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
    queryInterface.dropTable("theme");
  }
};
