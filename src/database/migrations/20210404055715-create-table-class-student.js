'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("class_student",{
      id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true 
      },
      class_id: {
        type: Sequelize.INTEGER,
        allownull: true,
        references: {
          model: "class",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      student_id: {
        type: Sequelize.INTEGER,
        allownull: true,
        references: {
          model: "student",
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
    queryInterface.dropTable('class_student');
     
  }
};
