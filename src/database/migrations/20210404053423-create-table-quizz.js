"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("quizz", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status_quizz: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      socket_id: {
        type: Sequelize.STRING,
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
      teacher_id: {
        type: Sequelize.INTEGER,
        allownull: true,
        references: {
          model: "teacher",
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
    queryInterface.dropTable("quizz");
  },
};
