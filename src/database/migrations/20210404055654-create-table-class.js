'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("class",{
      id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true 
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      course_id: {
        type: Sequelize.INTEGER,
        allownull: true,
        references: {
          model: "course",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      teacher_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "teacher",
          key: "id",
        },
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
    queryInterface.dropTable("class");
  }
};
