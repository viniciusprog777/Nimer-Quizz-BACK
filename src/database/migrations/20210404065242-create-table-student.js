'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("student",{
      id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true 
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true 
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image:{
        type: Sequelize.STRING
      },
      date_birthday: {
        type: Sequelize.STRING,
        allowNull: false
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
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("student")
  }
};
