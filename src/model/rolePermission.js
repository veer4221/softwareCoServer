"use strict";

module.exports = (sequelize, Sequelize) => {
  var Model = sequelize.define(
    "RolePermission",
    {
      role_id: {
        type: Sequelize.INTEGER(22),
      },
      menu_id: {
        type: Sequelize.INTEGER(22),
      },
      permission_id: {
        type: Sequelize.INTEGER(22),
      },
      // add: {
      //   type: Sequelize.ENUM("0", "1"),
      //   allowNull: true,
      // },
      // edit: {
      //   type: Sequelize.ENUM("0", "1"),
      //   allowNull: true,
      // },
      // delete: {
      //   type: Sequelize.ENUM("0", "1"),
      //   allowNull: true,
      // },
      // view: {
      //   type: Sequelize.ENUM("0", "1"),
      //   allowNull: true,
      // },
      /* created_at: {
            allowNull: true,
            type: Sequelize.DATE,
            default:Date.now
        },
        updated_at: {
            allowNull: true,
            type: Sequelize.DATE,
            default:Date.now
        }   */
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
      timestamps: true,
      tableName: "role_permission",
    }
  );

  Model.associate = function (models) {
    Model.belongsTo(models.Role, { foreignKey: "role_id" });
    Model.belongsTo(models.Menu, { foreignKey: "menu_id" });
    Model.belongsTo(models.Menu, { foreignKey: "permission_id" });
    models.Role.hasMany(Model, { foreignKey: "role_id" });
    models.Menu.hasOne(Model, { foreignKey: "menu_id" });
    models.Menu.hasOne(Model, { foreignKey: "permission_id" });
  };

  Model.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  Model.sync({ alter: true });
  return Model;
};
