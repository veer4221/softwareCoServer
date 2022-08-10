//const AppUser = require("../../../model/user");
const Op = require("sequelize").Op;
const db = require("../../../model");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

module.exports = {
  login,
};
async function localLogin(body) {
  try {
    let res = {
      valid: false,
    };
    let dbUser = await db.adminUser.findOne({
      where: {
        [Op.or]: [
          { email: { [Op.eq]: body.email } },
          { userName: { [Op.eq]: body.userName } },
        ],
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
      if (dbUser.dataValues) {
        dbUser = dbUser.dataValues;
      }
    }
    if (!dbUser) {
      res.err = {
        message: CONFIG.EMAIL_NOT_EXIST,
        code: CONFIG.CREATE_CODE,
      };
      return res;
    } else if (dbUser.status === CONFIG.RECORD_INACTIVE) {
      res.err = {
        message: CONFIG.ERR_ACCOUNT_BLOCKED,
        code: CONFIG.ERROR_CODE_BLOCKED_USER,
      };
      return res;
    } else {
      if (dbUser.password) {
        let validPassword = await bcrypt.compareSync(
          body.password,
          dbUser.password
        );
        if (validPassword) {
          res.valid = true;
          res.data = dbUser;
          //console.log(res);
          return res;
        } else {
          res.err = {
            message: CONFIG.INVALID_LOGIN,
          };
          return res;
        }
      } else {
        res.err = {
          message: CONFIG.INVALID_LOGIN,
        };
        return res;
      }
    }
  } catch (error) {
    console.log(error);
    return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
  }
}

async function login(req, res) {
  try {
    let loginRes = {};
    if (req.body.email && req.body.password) {
      loginRes = await localLogin(req.body);
    } else {
      loginRes.valid = false;
      loginRes.err = {
        message: CONFIG.INVALID_REQUEST,
      };
    }
    if (loginRes.valid) {
      let token =
        CONFIG.JWT_PRE_TOKEN +
        jwt.sign(
          {
            user_id: loginRes.data.id,
            email: loginRes.data.email,
          },
          CONFIG.JWT_SECRET,
          {
            expiresIn: "10h",
          }
        );
      let resData = {
        profile: loginRes.data,
        token: token,
      };
      let roleID = resData.profile.role_id;
      ReS(
        res,
        {
          data: resData,
        },
        CONFIG.OK_CODE
      );
    } else {
      ReE(res, loginRes.err, CONFIG.OK_CODE);
    }
  } catch (error) {
    console.log(error);
    return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
  }
}
