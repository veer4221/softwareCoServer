"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("adminUser", [
      {
        id: 1,
        firstName: "demo",
        lastName: "demo",
        email: "demo1234@gmail.com",
        password:
          "$2a$10$vN2v/Sf9slrEHJluMUJbO.M/.XJO9NjOVVf35N0Wya0l834oIqa8a",
        userName: "demo1234",
        role_id: 1,
        mobileNumber: "9999999999",
        status: 1,
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
