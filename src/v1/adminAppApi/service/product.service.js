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

const { isPrmissionsForThisAPI } = require("../../../middleware/PermissionCheck");
const XLSX = require("xlsx");

module.exports = {
  createProduct,
  getAllProduct,
  changeStatus,
  getProduct,
  updateProduct,
  addToCart,
  getCart,
  changeCartStatus
};
async function changeCartStatus(req, res) {
  try {
    await isPrmissionsForThisAPI(req, res, CONFIG.REMOVE_FROM_CART)

    let query = req.query;
    console.log(query);
    var [err, userid] = await to(db.Cart.destroy({ where: { product_id: query.id } }));
    if (err) return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);

    return ReS(res, CONFIG.SUCCESS_USER_DELETED, CONFIG.SUCCESS_CODE);
  } catch (error) {
    console.log(error);
    return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
  }
}
async function getCart(req, res) {
  try {
    await isPrmissionsForThisAPI(req, res, CONFIG.VIEW_CART)

    let whereClause = {};
    let query = req.query;
    let perPage = parseInt(query.limit == undefined ? CONFIG.PERPAGE : query.limit); // number of records per page
    let page = parseInt(query.page == undefined ? 1 : query.page); //page
    let offset = perPage * (page - 1);
    let keyword = query.keyword;
    whereClause = {
      [Op.and]: [{ status: { [Op.ne]: CONFIG.RECORD_DELETED } }],
    };
    db.Cart.findAndCountAll({
      where: whereClause,
      limit: perPage,
      offset: offset,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.adminUser,
        },
        {
          model: db.Product,
        },]
    })
      .then(async function (users) {
        if (users) {
          return ReS(res, users, CONFIG.SUCCESS_CODE);
        } else {
          return ReS(res, { users, message: CONFIG.NO_DATA_FOUND }, CONFIG.SUCCESS_CODE);
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
async function addToCart(req, res, next) {
  await isPrmissionsForThisAPI(req, res, CONFIG.ADD_TO_CART)

  req.body.user_id = req?.user?.dataValues?.id
  try {
    db.Cart.create(req.body)
      .then(function (data) {
        return ReS(res, { data, message: CONFIG.ADD_TO_CART_DONE }, CONFIG.SUCCESS_CODE);
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
async function getProduct(req, res) {
  await isPrmissionsForThisAPI(req, res, CONFIG.VIEW_PRODUCT)

  try {
    let resData = {};
    let query = req.query;
    var [err, userData] = await to(db.Product.findOne({ where: { id: query.id } }));
    if (err) return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
    else resData.success = true;
    resData.Productdata = userData;
    return ReS(res, resData, CONFIG.SUCCESS_CODE);
  } catch (error) {
    console.log(error);
    return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
  }
}

async function changeStatus(req, res) {
  try {
    await isPrmissionsForThisAPI(req, res, CONFIG.DELETE_PRODUCT)

    let query = req.query;
    var [err, userid] = await to(db.Products.findOne({ where: { id: query.id } }));
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

async function getAllProduct(req, res) {
  await isPrmissionsForThisAPI(req, res, CONFIG.VIEW_PRODUCT)

  try {
    let whereClause = {};
    let query = req.query;
    let perPage = parseInt(query.limit == undefined ? CONFIG.PERPAGE : query.limit); // number of records per page
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
            product_name: { [Op.like]: "%" + keyword.toLowerCase() + "%" },
          },
        ],
      });
    }
    db.Product.findAndCountAll({
      where: whereClause,
      limit: perPage,
      offset: offset,
      order: [["createdAt", "DESC"]],
    })
      .then(async function (users) {
        if (users) {
          return ReS(res, users, CONFIG.SUCCESS_CODE);
        } else {
          return ReS(res, { users, message: CONFIG.NO_DATA_FOUND }, CONFIG.SUCCESS_CODE);
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
async function createProduct(req, res) {
  await isPrmissionsForThisAPI(req, res, CONFIG.ADD_PRODUCT)
  try {
    db.Product.create(req.body)
      .then(function (data) {
        return ReS(res, { data, message: CONFIG.SUCCESS_RESULT }, CONFIG.SUCCESS_CODE);
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
async function updateProduct(req, res) {
  try {
    await isPrmissionsForThisAPI(req, res, CONFIG.EDIT_PRODUCT)
    var body = req.body;
    if (body?.id) {
      await db.deal
        .update(body, {
          where: {
            id: body?.id,
          },
        })
        .then((data) => {
          return ReS(
            res,
            {
              message: "Product updated",
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
