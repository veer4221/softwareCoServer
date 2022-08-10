const Op = require("sequelize").Op;
const db = require("../../../model");
const roleAndPermissionChecker = require("../../../middleware/roleAndPermissionChecker");
const  {isPrmissionsForThisAPI} =require("../../../middleware/PermissionCheck")

module.exports = { getRoleMenu, createRole, getAllRole, updateRole, getRole ,getRoleAndID,changeRoleStatus};

async function getRoleMenu(req, res) {
  try {
    // await isPrmissionsForThisAPI(req,res, CONFIG.)

    let nodes = [];
    let whereClause = {};

    whereClause = {
      [Op.and]: [{ status: { [Op.ne]: CONFIG.RECORD_DELETED } }],
    };
    var [err, indexMenu] = await to(
      db.Menu.findAndCountAll({
        where: {
          index: {
            [Op.ne]: null,
          },
        },
        attributes: ["id", "menu_name"],
      })
    );

    if (err) return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);

    createManuObj(nodes, indexMenu)
      .then((nodes) => {
        return ReS(res, nodes, CONFIG.SUCCESS_CODE);
        res.send(nodes);
      })
      .catch((error) => {
        return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
      });
  } catch (error) {
    console.log(error);
    return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
  }
}

async function changeRoleStatus(req, res) {
  try {
    try {
    await isPrmissionsForThisAPI(req,res, CONFIG.DELETE_ROLE)

      userId = req.user.dataValues.id;
      const result = await roleAndPermissionChecker(userId,CONFIG.DELETE_ROLE);
      if (result == 0) {
        return ReE(res, CONFIG.PERMISSION_ERROR, CONFIG.FORBIDDEN);
      } else if(result ==3){
      return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
      }
    } catch (error) {
      console.log(error);
      return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
    }
    let query = req.query;
    var [err, RoleObj] = await to(
      db.Role.findOne({ where: { id: query.id } })
    );
    if (err) return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
    RoleObj.set({ status: query.status });
    [err, RoleObj] = await to(RoleObj.save());
    if (err) return ReE(res, CONFIG.ERROR_CODE);
    else return ReS(res, CONFIG.SUCCESS_ROLE_DELETED, CONFIG.SUCCESS_CODE);
  } catch (error) {
    console.log(error);
    return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
  }
}


async function createManuObj(nodes, indexMenu) {
  return new Promise(async function (resolve, reject) {
    console.log("veer4221");
    const promises = indexMenu.rows.map(async (item, index) => {
      // console.log(index);
      try {
        var [err, chieldMenu] = await to(
          db.Menu.findAndCountAll({
            where: {
              parent: {
                [Op.eq]: item.id,
              },
            },
            attributes: ["id", "menu_name"],
          })
        );
        // console.log("child",chieldMenu)
        if (err)
          return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
        var children = [];

        await chieldMenu.rows.forEach(async (item, index) => {
          let ChildObj = {};
          ChildObj.value = item.id;
          ChildObj.label = item.menu_name;
          children.push(ChildObj);

        });
        var parentObj = {};
        parentObj.value = item.id;
        parentObj.label = item.menu_name;
        parentObj.children = children;
        nodes.push(parentObj);
        // console.log(nodes);
        // if (indexMenu.rows.length == index) {
        //   return resolve({ nodes });
        // }
      } catch (error) {
        console.log(error)
        return reject({ error });
      }
    });
    await Promise.all(promises);

    return resolve({ nodes });
  });
}

async function createRole(req, res) {
  try {
    await isPrmissionsForThisAPI(req,res, CONFIG.ADD_ROLE)

    try {
      userId = req.user.dataValues.id;
      const result = await roleAndPermissionChecker(userId,CONFIG.ADD_ROLE);
      if (result == 0) {
        return ReE(res, CONFIG.PERMISSION_ERROR, CONFIG.FORBIDDEN);
      } else if(result ==3){
      return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
      }
    } catch (error) {
      console.log(error);
      return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
    }
    let isExist = await isRoleExist(req.body.role_name);
    if (isExist) {
      let err = {
        message: CONFIG.ROLE_ALREADY_EXIST,
      };
      ReE(res, err, CONFIG.BAD_REQUEST);
      return;
    }
    db.Role.create(req.body)
      .then(function (data) {
        const role_Id = data.id;
        (async function loop() {
          for (let i = 0; i < req.body.permission.length; i++) {
            let permissionId = parseInt(req.body.permission[i]);

            var [err, parentId] = await to(
              db.Menu.findAll({
                where: {
                  id: permissionId,
                },
                attributes: ["parent"],
              })
            );

            if (err)
              return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);


            var permissionBody = {};
            permissionBody.role_id = role_Id;
            permissionBody.menu_id = parentId[0].parent;
            permissionBody.permission_id = req.body.permission[i];
            const [error, permissionObject] = await to(
              db.RolePermission.create(permissionBody)
            );
            if (error) {
              return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
            }
          }
        })();
        return ReS(
          res,
          { data, message: CONFIG.SUCCESS_RESULT },
          CONFIG.SUCCESS_CODE
        );
      })
      .catch(function (err) {
        console.log(err);
        return ReE(res, CONFIG.BAD_REQUEST_MESSAGE, CONFIG.BAD_REQUEST);
      });
  } catch (error) {
    console.log(error);
    return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
  }
}

async function isRoleExist(role_name) {
  let users = await db.Role.findAndCountAll({
    where: {
      role_name: role_name,
      status: { [Op.ne]: CONFIG.RECORD_DELETED },
    },
  });
  return users.count > 0 ? true : false;
}

async function getAllRole(req, res) {
  try {
    await isPrmissionsForThisAPI(req,res, CONFIG.VIEW_ROLE)

    try {
      userId = req.user.dataValues.id;
      const result = await roleAndPermissionChecker(userId,CONFIG.VIEW_ROLE);
      if (result == 0) {
        return ReE(res, CONFIG.PERMISSION_ERROR, CONFIG.FORBIDDEN);
      } else if(result ==3){
      return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
      }
    } catch (error) {
      console.log(error);
      return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
    }
    let whereClause = {};
    let query = req.query;
    let perPage = parseInt(
      query.limit == undefined ? CONFIG.PERPAGE : query.limit
    ); // number of records per page
    let page = parseInt(query.page == undefined ? 1 : query.page); //page
    let offset = perPage * (page - 1);
    let keyword = query.keyword;
    whereClause = {
      [Op.and]: [{ status: { [Op.ne]: CONFIG.RECORD_DELETED } }],
    };

    if (keyword) {
      whereClause[Op.and].push({
        [Op.or]: [
          {
            role_name: { [Op.like]: "%" + keyword.toLowerCase() + "%" },
          },
        ],
      });
    }

    db.Role.findAndCountAll({
      where: whereClause,
      limit: perPage,
      offset: offset,
    })
      .then(async function (Role) {
        if (Role) {
          return ReS(res, Role, CONFIG.SUCCESS_CODE);
        } else {
          return ReS(
            res,
            { Role, message: CONFIG.NO_DATA_FOUND },
            CONFIG.SUCCESS_CODE
          );
        }
      })
      .catch((error) => {
        console.log(error);
        return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
      });
  } catch (error) {
    console.log(error);
    return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
  }
}
async function getRoleAndID(req,res){
  try {

    let whereClause = {};

    whereClause = {
      [Op.and]: [{ status: { [Op.ne]: CONFIG.RECORD_DELETED } }],
    };



    db.Role.findAndCountAll({
      where: whereClause,
      attributes: ["id","role_name"]
    })
      .then(async function (Role) {
        if (Role) {
          return ReS(res, Role, CONFIG.SUCCESS_CODE);
        } else {
          return ReS(
            res,
            { Role, message: CONFIG.NO_DATA_FOUND },
            CONFIG.SUCCESS_CODE
          );
        }
      })
      .catch((error) => {
        console.log(error);
        return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
      });
  } catch (error) {
    console.log(error);
    return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
  }
}
async function updateRole(req, res) {
  await isPrmissionsForThisAPI(req,res, CONFIG.MODIFY_ROLE)

  try {
    try {
      userId = req.user.dataValues.id;
      const result = await roleAndPermissionChecker(userId,CONFIG.MODIFY_ROLE);
      if (result == 0) {
        return ReE(res, CONFIG.PERMISSION_ERROR, CONFIG.FORBIDDEN);
      } else if(result ==3){
      return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
      }
    } catch (error) {
      console.log(error);
      return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
    }
    var body = req.body;
    if (body.id) {
      let RoleId = body.id;
      await db.Role.update(body, {
        where: {
          id: RoleId,
        },
      })
        .then(async (data) => {
          // res.send(data)
          const [err, deleteObj] = await to(db.RolePermission.destroy({
            where: {
              role_Id: RoleId
            }
          }))
          if (err) {
            return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
          }

          const role_Id = RoleId;
          (async function loop() {
            for (let i = 0; i < req.body.permission.length; i++) {
              let permissionId = parseInt(req.body.permission[i]);

              var [err, parentId] = await to(
                db.Menu.findAll({
                  where: {
                    id: permissionId,
                  },
                  attributes: ["parent"],
                })
              );

              if (err)
                return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);

              console.log(parentId);
              var permissionBody = {};
              permissionBody.role_id = role_Id;
              permissionBody.menu_id = parentId[0].parent;
              permissionBody.permission_id = req.body.permission[i];
              const [error, permissionObject] = await to(
                db.RolePermission.create(permissionBody)
              );
              if (error) {
                return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
              }
            }
          })();



          return ReS(
            res,
            {
              message: "roleUpdated",
            },
            CONFIG.OK_CODE
          );
        })
        .catch((error) => {
          console.log(error);
          return ReE(
            res,
            {
              message: CONFIG.APP_ROLE_UPDATE_ERROR,
            },
            CONFIG.BAD_REQUEST
          );
        });
    } else {
      return ReE(
        res,
        {
          message: CONFIG.ROLE_ID_NOT_FOUND,
        },
        CONFIG.BAD_REQUEST
      );
    }
  } catch (error) {
    console.log(error);
    return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
  }
}

async function getRole(req, res) {
  try {
    await isPrmissionsForThisAPI(req,res, CONFIG.VIEW_ROLE)

    try {
      userId = req.user.dataValues.id;
      const result = await roleAndPermissionChecker(userId,CONFIG.VIEW_ROLE);
      if (result == 0) {
        return ReE(res, CONFIG.PERMISSION_ERROR, CONFIG.FORBIDDEN);
      } else if(result ==3){
      return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
      }
    } catch (error) {
      console.log(error);
      return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
    }
    let resData = {};
    let query = req.query;
    var [err, roleData] = await to(
      db.Role.findOne({ where: { id: query.id } })
    );
    if (err) return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);

    resData.role = roleData;
    var [error,permissionArray] = await to(
      db.RolePermission.findAll({
        where:{role_id:query.id},
        attributes: ["permission_id"],
        include: [
          {
            model: db.Menu,
            attributes: ["menu_name","menu_value"],
            include: [
              {
                model: db.Menu,
                attributes: ["menu_name","menu_value"],

              },
            ],

          },
        ],
      })
    )
    if (error) return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
    else resData.success = true;
    resData.permissions = permissionArray;

    // res.send(permissionArray)
    return ReS(res, resData, CONFIG.SUCCESS_CODE);
  } catch (error) {
    console.log(error);
    return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
  }
}
