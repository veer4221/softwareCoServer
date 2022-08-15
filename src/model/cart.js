const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
module.exports = function (sequelize, Sequelize) {
  var Model = sequelize.define(
    "Cart",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(22),
      },
      product_id: {
        type: Sequelize.BIGINT(22),
        allowNull: true,
      },
      user_id: {
        type: Sequelize.BIGINT(22),
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


  Model.associate = function (models) {
    Model.belongsTo(models.Product, { foreignKey: "product_id" });
    models.Product.hasMany(Model, { foreignKey: "product_id" });
    Model.belongsTo(models.adminUser, { foreignKey: "user_id" });
    models.adminUser.hasMany(Model, { foreignKey: "user_id" });
  };
  Model.sync({ alter: true });

  return Model;
};
