const db = require("../model");
const Op = require("sequelize").Op;

module.exports = async function (userId,permissions) {
  try {
    let dbUser = await db.adminUser.findOne({
      where: {
        id: userId,
        status: { [Op.ne]: CONFIG.RECORD_DELETED },
      },
      include: [
        {
          model: db.Role,
          attributes: ["id", "role_name"],
          include: [
            {
              model: db.RolePermission,
              attributes: ["id", "menu_id", "permission_id"],

              include: [
                {
                  model: db.Menu,
                  attributes: ["menu_name", "menu_value"],
                  include: [
                    {
                      model: db.Menu,
                      attributes: ["menu_name", "menu_value"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    if (dbUser) {
      console.log("dbuser",dbUser)
    //   return dbUser;
      const result = dbUser.Role.RolePermissions.find(
        (data) => data.Menu.menu_value == permissions
      );
    //   console.log("result" ,result);
      if (result) {
        return 1;
      } else {
        return 0;
      }
    //   res.send(dbUser);
    }
  } catch (error) {
    console.log(error);
    return 3;
    // return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
  }
};
