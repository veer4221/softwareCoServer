// 'use strict';

module.exports = (sequelize, Sequelize) => {
  var Model = sequelize.define(
    "Menu",
    {
      menu_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      parent: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
      },
      index: {
        type: Sequelize.BIGINT(22),
        allowNull: true,
      },
      menu_value: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      status: {
        // type: Sequelize.INTEGER(1),
        type: Sequelize.ENUM("0", "1"),
        allowNull: true,
      },
      page_url: {
        type: Sequelize.STRING(255),
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
      tableName: "menu",
    }
  );

  Model.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  Model.associate = function (models) {
    Model.belongsTo(models.Menu, { foreignKey: "parent" });
    models.Menu.hasMany(Model, { foreignKey: "parent" });
  };
  Model.sync({ alter: true });
  return Model;
};
