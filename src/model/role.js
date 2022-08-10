"use strict";

module.exports = (sequelize, Sequelize) => {
  var Model = sequelize.define(
    "Role",
    {
      role_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER(1),
        defaultValue: 1,
        allowNull: true,
      },
      created_by: {
        type: Sequelize.INTEGER(1),
        allowNull: true,
      },
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
      tableName: "role",
    }
  );

  Model.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  Model.sync({ alter: true });
  return Model;
};
