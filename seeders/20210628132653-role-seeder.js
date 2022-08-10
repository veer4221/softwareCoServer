'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('role',[
      {
        id:1,
        role_name:"Super Admin",
        status:1,
      },
      {
        id:2,
        role_name:"Category Manager",
        status:1,
      },
      {
        id:3,
        role_name:"State Manager",
        status:1,
      },
      {
        id:4,
        role_name:"Franchise",
        status:1,
      },
      {
        id:5,
        role_name:"demo",
        status:1,
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
