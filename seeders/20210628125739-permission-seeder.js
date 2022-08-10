"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("role_permission", [
      {
        id: 1,
        role_id: 1,
        menu_id: 1,
        permission_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        role_id: 1,
        menu_id: 1,
        permission_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        role_id: 1,
        menu_id: 1,
        permission_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        role_id: 1,
        menu_id: 1,
        permission_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        role_id: 1,
        menu_id: 6,
        permission_id: 7,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 6,
        role_id: 1,
        menu_id: 6,
        permission_id: 8,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
