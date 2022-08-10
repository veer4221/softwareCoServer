const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
module.exports = function (sequelize, Sequelize) {
  var Model = sequelize.define(
    "Product",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(22),
      },
      product_name: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      m_r_p: {
        type: Sequelize.BIGINT(22),
        allowNull: true,
      },
      product_image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      product_information: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      status: {
        type: Sequelize.INTEGER(1),
        defaultValue: 1,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: "updated_at",
      },
    },
    {
      freezeTableName: true,
    }
  );

  Model.sync({ alter: true });

  return Model;
};
