const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
var bcrypt = require("bcrypt-nodejs");
const Op = require("sequelize").Op;
const db = require("../../../model");
const readXlsxFile = require("read-excel-file/node");
var path = require("path");
var Sequelize = require("sequelize");
const roleAndPermissionChecker = require("../../../middleware/roleAndPermissionChecker");
const { user } = require("../../../config/db");
const { where } = require("sequelize");
// const EmailSender = require("../../../../helper/emailSender");

const {
  isPrmissionsForThisAPI,
} = require("../../../middleware/PermissionCheck");
const XLSX = require("xlsx");

module.exports = {
  signup,
  getAllUsers,
  changeStatus,
  getUser,
  updateUser
};


async function updateUser(req, res) {
  try {
    // await isPrmissionsForThisAPI(req,res, CONFIG.EDIT_DEAL)
    var body = req.body;
    if (body?.id) {
      await db.adminUser
        .update(body, {
          where: {
            id: body?.id,
          },
        })
        .then((data) => {
          return ReS(
            res,
            {
              message: "user updated",
            },
            CONFIG.OK_CODE
          );
        })
        .catch((error) => {
          console.log(error);
          return ReE(
            res,
            {
              message: CONFIG.APP_DEAL_UPDATE_ERROR,
            },
            CONFIG.BAD_REQUEST
          );
        });
    } else {
      return ReE(
        res,
        {
          message: CONFIG.PROFILE_DEAL_ID_NOT_FOUND,
        },
        CONFIG.BAD_REQUEST
      );
    }
  } catch (error) {
    console.log(error);
    return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
  }
}
async function getUser(req, res) {
  try {
    // await isPrmissionsForThisAPI(req, res, CONFIG.VIEW_USER);
    let resData = {};
    let query = req.query;
    var [err, userData] = await to(
      db.adminUser.findOne({ where: { id: query.id } })
    );
    if (err) return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
    else resData.success = true;
    resData.adminUser = userData;
    return ReS(res, resData, CONFIG.SUCCESS_CODE);
  } catch (error) {
    console.log(error);
    return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
  }
}

async function changeStatus(req, res) {
  try {
    await isPrmissionsForThisAPI(req, res, CONFIG.DELETE_USER);
    let query = req.query;
    var [err, userid] = await to(
      db.adminUser.findOne({ where: { id: query.id } })
    );
    if (err) return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
    userid.set({ status: query.status });
    [err, userid] = await to(userid.save());
    if (err) return ReE(res, CONFIG.ERROR_CODE);
    else return ReS(res, CONFIG.SUCCESS_USER_DELETED, CONFIG.SUCCESS_CODE);
  } catch (error) {
    console.log(error);
    return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
  }
}

async function getAllUsers(req, res) {
  try {
    // await isPrmissionsForThisAPI(req, res, CONFIG.VIEW_USER);
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
            firstname: { [Op.like]: "%" + keyword.toLowerCase() + "%" },
          },
          {
            lastname: { [Op.like]: "%" + keyword.toLowerCase() + "%" },
          },
          {
            email: { [Op.like]: "%" + keyword.toLowerCase() + "%" },
          },
        ],
      });
    }

    db.adminUser
      .findAndCountAll({
        where: whereClause,
        attributes: [
          "id",
          "firstname",
          "lastname",
          "email",
          "userName",
          "mobileNumber",
          "status",
          "createdAt",
          "updatedAt",
        ],
        include: [
          {
            model: db.Role,
            attributes: ["id", "role_name"],
          },
        ],
        limit: perPage,
        offset: offset,
        order: [["createdAt", "DESC"]],
      })
      .then(async function (users) {
        if (users) {
          return ReS(res, users, CONFIG.SUCCESS_CODE);
        } else {
          return ReS(
            res,
            { users, message: CONFIG.NO_DATA_FOUND },
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

async function isEmailExist(email, Id = null) {
  whereClause = {
    [Op.and]: [{ status: { [Op.ne]: CONFIG.RECORD_DELETED } }],
  };

  if (Id != null) {
    whereClause[Op.and].push({
      [Op.and]: [{ id: { [Op.ne]: Id } }, { email: email }],
    });
  } else {
    whereClause[Op.and].push({
      [Op.and]: [{ email: email }],
    });
  }
  let users = await db.adminUser.findAndCountAll({
    where: whereClause,
  });
  return users.count > 0 ? true : false;
}
async function signup(req, res) {
  try {
    // await isPrmissionsForThisAPI(req, res, CONFIG.ADD_USER);
    let isExist = await isEmailExist(req.body.email);
    if (isExist) {
      let err = {
        message: CONFIG.ADMIN_ALREADY_EXIST,
      };
      ReE(res, err, CONFIG.SUCCESS_CODE);
      return;
    }
    db.adminUser
      .create(req.body)
      .then(function (data) {
        return ReS(
          res,
          { data, message: CONFIG.USER_CREATED_MESSAGE },
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
