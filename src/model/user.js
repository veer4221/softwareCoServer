const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
module.exports = function (sequelize, Sequelize) {
  var Model = sequelize.define(
    "adminUser",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(22),
      },
      firstName: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      lastName: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      mobileNumber: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING(250),
        allowNull: true,
      },
      userName: {
        type: Sequelize.STRING(250),
        allowNull: true,
      },
      parent:{     
        type: Sequelize.BIGINT(22),
        allowNull: true,
      },
      role_id: {
        type: Sequelize.INTEGER(22),
        allowNull: true,
      },
      passResetCode: { type: Sequelize.STRING(250), allowNull: true },
      passKeyExpires: { type: Sequelize.DATE, allowNull: true },
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

  // Creating a custom method for our  model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  Model.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  Model.beforeSave(async (user, options) => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  Model.associate = function (models) {
    Model.belongsTo(models.Role, { foreignKey: "role_id" });
    models.Role.hasOne(Model, { foreignKey: "role_id" });
    Model.belongsTo(models.adminUser, { foreignKey: "parent" });
    models.adminUser.hasOne(Model, { foreignKey: "parent" });
  };

  Model.sync({ alter: true });

  return Model;
};
