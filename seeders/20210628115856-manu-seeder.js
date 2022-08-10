"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("menu", [
      {
        id: 1,
        menu_name: "Product",
        parent: null,
        index: 1,
        status: "1",
        menu_value: "PRODUCT",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        menu_name: "Add Product",
        parent: 1,
        index: null,
        status: "1",
        menu_value: "ADD_PRODUCT",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        menu_name: "Edit Product",
        parent: 1,
        index: null,
        status: "1",
        menu_value: "EDIT_USER",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        menu_name: "View Product",
        parent: 1,
        index: null,
        status: "1",
        menu_value: "VIEW_PRODUCT",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        menu_name: "Delete Product",
        parent: 1,
        index: null,
        status: "1",
        menu_value: "DELETE_PRODUCT",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 6,
        menu_name: "Cart",
        parent: null,
        index: 2,
        status: "1",
        menu_value: "CART",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 7,
        menu_name: "Add To Cart",
        parent: 2,
        index: null,
        status: "1",
        menu_value: "ADD_TO_CART",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 8,
        menu_name: "Remove From Cart",
        parent: 2,
        index: null,
        status: "1",
        menu_value: "REMOVE_FROM_CART",
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
