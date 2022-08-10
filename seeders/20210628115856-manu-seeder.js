'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('menu',[
      {
        id:1,
        menu_name:"User",
        parent:null,
        index:1,
        status:'1',
        menu_value:"USER",
        created_at:new Date(),
        updated_at:new Date()
      },
      {
        id:2,
        menu_name:"Add User",
        parent:1,
        index:null,
        status:'1',
        menu_value:"ADD_USER",
        created_at:new Date(),
        updated_at:new Date()
      },
      {
        id:3,
        menu_name:"Edit User",
        parent:1,
        index:null,
        status:'1',
        menu_value:"EDIT_USER",
        created_at:new Date(),
        updated_at:new Date()
      },
      {
        id:4,
        menu_name:"Delete User",
        parent:1,
        index:null,
        status:'1',
        menu_value:"DELETE_USER",
        created_at:new Date(),
        updated_at:new Date()
      },
      {
        id:5,
        menu_name:"View User",
        parent:1,
        index:null,
        status:'1',
        menu_value:"VIEW_USER",
        created_at:new Date(),
        updated_at:new Date()
      },
      {
        id:6,
        menu_name:"Merchant",
        parent:null,
        index:2,
        status:'1',
        menu_value:"MERCHANT",
        created_at:new Date(),
        updated_at:new Date()
      },
      {
        id:7,
        menu_name:"Add Merchant",
        parent:6,
        index:null,
        status:'1',
        menu_value:"ADD_MERCHANT",
        created_at:new Date(),
        updated_at:new Date()
      },
      {
        id:8,
        menu_name:"Edit Merchant",
        parent:6,
        index:null,
        status:'1',
        menu_value:"EDIT_MERCHANT",
        created_at:new Date(),
        updated_at:new Date()
      },
      {
        id:9,
        menu_name:"Delete Merchant",
        parent:6,
        index:null,
        status:'1',
        menu_value:"DELETE_MERCHANT",
        created_at:new Date(),
        updated_at:new Date()
      },
      {
        id:10,
        menu_name:"View Merchant",
        parent:6,
        index:null,
        status:'1',
        menu_value:"VIEW_MERCHANT",
        created_at:new Date(),
        updated_at:new Date()
      },
      {
        id:11,
        menu_name:"Deal",
        parent:null,
        index:3,
        status:'1',
        menu_value:"DEAL",
        created_at:new Date(),
        updated_at:new Date()
      },
      {
        id:12,
        menu_name:"Add Deal",
        parent:11,
        index:null,
        status:'1',
        menu_value:"ADD_DEAL",
        created_at:new Date(),
        updated_at:new Date()
      },
      {
        id:13,
        menu_name:"Edit Deal",
        parent:11,
        index:null,
        status:'1',
        menu_value:"EDIT_DEAL",
        created_at:new Date(),
        updated_at:new Date()
      },
      {
        id:14,
        menu_name:"Delete Deal",
        parent:11,
        index:null,
        status:'1',
        menu_value:"DELETE_DEAL",
        created_at:new Date(),
        updated_at:new Date()
      },
      {
        id:15,
        menu_name:"View Deal",
        parent:11,
        index:null,
        status:'1',
        menu_value:"VIEW_DEAL",
        created_at:new Date(),
        updated_at:new Date()
      },
      {
        id:16,
        menu_name:"dashboard",
        parent:null,
        index:4,
        status:'1',
        menu_value:"DASHBOARD",
        created_at:new Date(),
        updated_at:new Date()
      },
      {
        id:17,
        menu_name:"view Dashboard",
        parent:16,
        index:null,
        status:'1',
        menu_value:"VIEW_DASHBOARD",
        created_at:new Date(),
        updated_at:new Date()
      },
      {
        id:18,
        menu_name:"systemConfiguration",
        parent:null,
        index:5,
        status:'1',
        menu_value:"SYSTEM_CONFIGURATION",
        created_at:new Date(),
        updated_at:new Date()
      },
      {
        id:19,
        menu_name:"view SystemConfiguration",
        parent:18,
        index:null,
        status:'1',
        menu_value:"VIEW_SYSTEM_CONFIGURATION",
        created_at:new Date(),
        updated_at:new Date()
      },
      {
        id:20,
        menu_name:"Modify SystemConfiguration ",
        parent:18,
        index:null,
        status:'1',
        menu_value:"MODIFY_SYSTEM_CONFIGURATION",
        created_at:new Date(),
        updated_at:new Date()
      },
      {
        id:21,
        menu_name:"Role",
        parent:null,
        index:6,
        status:'1',
        menu_value:"ROLE",
        created_at:new Date(),
        updated_at:new Date()
      },
      {
        id:22,
        menu_name:"Modify Role",
        parent:21,
        index:null,
        status:'1',
        menu_value:"MODIFY_ROLE",
        created_at:new Date(),
        updated_at:new Date()
      },
      {
        id:23,
        menu_name:"Add Role",
        parent:21,
        index:null,
        status:'1',
        menu_value:"ADD_ROLE",
        created_at:new Date(),
        updated_at:new Date()
      },
      {
        id:24,
        menu_name:"View Role",
        parent:21,
        index:null,
        status:'1',
        menu_value:"VIEW_ROLE",
        created_at:new Date(),
        updated_at:new Date()
      },
      {
        id:25,
        menu_name:"Delete Role",
        parent:21,
        index:null,
        status:'1',
        menu_value:"DELETE_ROLE",
        created_at:new Date(),
        updated_at:new Date()
      },
      {
        id:26,
        menu_name:"commission summary",
        parent:null,
        index:7,
        status:'1',
        menu_value:"COMMISSION_SUMMARY",
        created_at:new Date(),
        updated_at:new Date()
      },
      {
        id:27,
        menu_name:"Import CSV",
        parent:26,
        index:null,
        status:'1',
        menu_value:"IMPORT_CSV",
        created_at:new Date(),
        updated_at:new Date()
      },
      {
        id:28,
        menu_name:"View Commission Summary",
        parent:26,
        index:null,
        status:'1',
        menu_value:"VIEW_COMMISSION_SUMMARY",
        created_at:new Date(),
        updated_at:new Date()
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
