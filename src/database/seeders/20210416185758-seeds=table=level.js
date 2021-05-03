"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("level", [
      {
        description: "Instituição",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: "Professor(a)",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: "Aluno",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("level", null, {});
  },
};
