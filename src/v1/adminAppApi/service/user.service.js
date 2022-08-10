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
const EmailSender = require("../../../../helper/emailSender");
const commission = require("../../../model/commission");
const {
  isPrmissionsForThisAPI,
} = require("../../../middleware/PermissionCheck");
const XLSX = require("xlsx");

module.exports = {
  signup,
  getAllUsers,
  changeStatus,
  getUser,
  updateUser,
  readExcelData,
  generateCommisionSummary,
  getAllUsersNameList,
  getAllsuperAdminList,
  getAllCategoryManagerList,
  getAllStateManager,
  getAllFranchise,
  setPassword,
  forgotPassword,
  testRole,
};
async function testRole(req, res) {
  await isPrmissionsForThisAPI(req, res, "EDIT_USER");

  res.send({ data: req.user.dataValues.Role.dataValues.RolePermissions });
}
async function getAllUsersNameList(req, res) {
  try {
    let whereClause = {};

    whereClause = {
      [Op.and]: [{ status: { [Op.ne]: CONFIG.RECORD_DELETED } }],
    };

    db.adminUser
      .findAndCountAll({
        where: whereClause,
        attributes: ["id", "firstname"],

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

async function getAllsuperAdminList(req, res) {
  try {
    let whereClause = {};

    whereClause = {
      [Op.and]: [
        { status: { [Op.ne]: CONFIG.RECORD_DELETED } },
        { role_id: 1 },
      ],
    };

    db.adminUser
      .findAndCountAll({
        where: whereClause,
        attributes: ["id", "firstname"],

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
async function getAllCategoryManagerList(req, res) {
  try {
    let whereClause = {};

    whereClause = {
      [Op.and]: [
        { status: { [Op.ne]: CONFIG.RECORD_DELETED } },
        { role_id: 2 },
      ],
    };

    db.adminUser
      .findAndCountAll({
        where: whereClause,
        attributes: ["id", "firstname"],

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
async function getAllStateManager(req, res) {
  try {
    let whereClause = {};

    whereClause = {
      [Op.and]: [
        { status: { [Op.ne]: CONFIG.RECORD_DELETED } },
        { role_id: 3 },
      ],
    };

    db.adminUser
      .findAndCountAll({
        where: whereClause,
        attributes: ["id", "firstname"],

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
async function getAllFranchise(req, res) {
  try {
    let whereClause = {};

    whereClause = {
      [Op.and]: [
        { status: { [Op.ne]: CONFIG.RECORD_DELETED } },
        { role_id: 4 },
      ],
    };

    db.adminUser
      .findAndCountAll({
        where: whereClause,
        attributes: ["id", "firstname"],

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
async function updateUser(req, res) {
  try {
    await isPrmissionsForThisAPI(req, res, CONFIG.EDIT_USER);

    // var [err, userData] = await to(
    //   db.adminUser.findOne({ where: { id: req.body.id }, attributes: [
    //     "email"] })
    // );
    // // console.log(userData)
    // if(req.body.email  !=userData.email ){

    let isExist = await isEmailExist(req.body.email, req.body.id);
    if (isExist) {
      let err = {
        message: CONFIG.ADMIN_ALREADY_EXIST,
      };
      ReE(res, err, CONFIG.SUCCESS_CODE);
      return;
    }
    // }
    var body = req.body;
    if (body.id) {
      let UserId = body.id;
      await db.adminUser
        .update(body, {
          where: {
            id: UserId,
          },
        })
        .then((data) => {
          return ReS(
            res,
            {
              message: "",
            },
            CONFIG.OK_CODE
          );
        })
        .catch((error) => {
          console.log(error);
          return ReE(
            res,
            {
              message: CONFIG.APP_USER_PROFILE_UPDATE_ERROR,
            },
            CONFIG.BAD_REQUEST
          );
        });
    } else {
      return ReE(
        res,
        {
          message: CONFIG.PROFILE_USER_ID_NOT_FOUND,
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
    await isPrmissionsForThisAPI(req, res, CONFIG.VIEW_USER);
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
    await isPrmissionsForThisAPI(req, res, CONFIG.VIEW_USER);
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

async function signup(req, res) {
  try {
    await isPrmissionsForThisAPI(req, res, CONFIG.ADD_USER);
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

async function upsertCommission(record, condition) {
  console.log(record, condition);
  const obj = await db.commission.findOne({ where: condition });
  if (obj) {
    await db.commission.update(record);
  } else {
    await db.commission.create(record);
  }
  // return db.commission.findOne({ where: condition }).then(function (obj) {
  //   // update
  //   console.log("obj",obj)
  //   if (obj) return obj.update(record);
  //   // insert
  //   return Model.create(record);
  // });
}
// async function readExcelData(req, res) {
//   try {
//     // try {
//     //   userId = req.user.dataValues.id;
//     //   const result = await roleAndPermissionChecker(userId, CONFIG.IMPORT_CSV);
//     //   if (result == 0) {
//     //     return ReE(res, CONFIG.PERMISSION_ERROR, CONFIG.FORBIDDEN);
//     //   } else if (result == 3) {
//     //     return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
//     //   }
//     // } catch (error) {
//     //   console.log(error);
//     //   return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
//     // }
//     const pubicPath = path.resolve(__dirname, "..", "..", "..", "..");
//     console.log(req.files);

//     let startup_image = req.files.file;

//     startup_image.mv(
//       pubicPath + "/public/excel/" + req.files.file.name,
//       function (err) {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log("Uploaded...");
//           readXlsxFile(pubicPath + "/public/excel/" + req.files.file.name).then(
//             (rows) => {
//               var i;
//               var excelDate = rows[0][3];
//               res.send({ date: excelDate });
//               if (validateExcelFile(rows[5]) == true) {
//                 (async function loop() {
//                   for (i = 8; i < rows.length; i++) {
//                     let record = {
//                       merchant_id: rows[i][0],
//                       merchant_name: rows[i][1],
//                       status: rows[i][2],
//                       act_date: rows[i][3],
//                       mcc: rows[i][6],
//                       pricing: rows[i][7],
//                       turn_over_credit: rows[i][13],
//                       turn_over_eftpos: rows[i][14],
//                       month: moment(excelDate, "YYYY-DD-MM").format("M"),
//                       // month: new Date().getMonth(),

//                       year: moment(excelDate, "YYYY-DD-MM").format("Y"),
//                       transaction_eftpos: rows[i][22],
//                       transaction_total: rows[i][23],
//                       transaction_refunds: rows[i][24],
//                       credit_msc: rows[i][26],
//                       epal_msc: rows[i][27],
//                       mmsf: rows[i][28],
//                       other_income: rows[i][29],
//                       total_msc: rows[i][30],
//                       credit_scheme_fees: rows[i][32],
//                       credit_interchange: rows[i][33],
//                       fd_margin: rows[i][34],
//                       ecomm_transaction_fees: rows[i][35],
//                       cp_epal_transaction_fees: rows[i][36],
//                       total_processing_rates: rows[i][37],
//                       min_merchant_service_fees: rows[i][39],
//                       non_returned_terminal_fees: rows[i][40],
//                       refunds: rows[i][41],
//                       chargeback: rows[i][42],
//                       closure: rows[i][43],
//                       countertop_ip_dial: rows[i][44],
//                       mobile_3G_wifi: rows[i][45],
//                       integrated: rows[i][46],
//                       total_other_rates: rows[i][47],
//                       total_commission: rows[i][49],
//                       sales_volume_domestic_visa: rows[i][51],
//                       sales_volume_intl_mc: rows[i][52],
//                       sales_volume_intl_visa: rows[i][53],
//                       debit: rows[i][54],
//                       transaction_count_domestic_mc: rows[i][56],
//                       transaction_count_domestic_visa: rows[i][57],
//                       transaction_count_intl_mc: rows[i][58],
//                       transaction_count_intl_visa: rows[i][59],
//                       transaction_count_debit: rows[i][60],
//                       total_scheme_fees: rows[i][61],
//                       excelDate: excelDate,
//                       deal_merchant: rows[i][63],
//                       deal_owner: rows[i][64],
//                       credit_card_rate_blended: rows[i][65],
//                       credit_card_rate_INT: rows[i][66],
//                       deal_debit_card_rate: rows[i][67],
//                       terminal_rental: rows[i][68],
//                       deal_comms_franchisee: rows[i][69],
//                       deal_comms_state_office: rows[i][70],
//                       deal_comms_category_manager: rows[i][71],
//                       deal_comms_head_office: rows[i][72],
//                       deal_EFTPOS_bonus_head_office: rows[i][73],
//                       deal_totel: rows[i][74],
//                       deal_Discrepancy: rows[i][74],
//                       deal_per_based_EFTPOS: rows[i][75],
//                       deal_head_office: rows[i][76],
//                     };
// record.totel_turn_over_credit_eftpos =
//   parseFloat(record.turn_over_credit) +
//   parseFloat(record.turn_over_eftpos);
//                     // db.commission.create(record);
// const commissionObj = await db.commission.findOne({
//   where: {
//     [Op.and]: [
//       { excelDate: record.excelDate },
//       { merchant_id: record.merchant_id },
//     ],
//   },
//   attributes: ["id", "excelDate", "merchant_id"],
//   raw: true,
// });
// var commissionRes = await commissionUpsert(
//   commissionObj,
//   record
// );
// const merchantObj = await db.merchant.findOne({
//   where: { merchant_id: record.merchant_id },
//   attributes: ["merchant_id"],
//   raw: true,
// });
// // console.log(commissionRes);
// let merchantData = {
//   merchant_name: record.merchant_name,
//   merchant_id: record.merchant_id.toString(),
//   merchant_status: record.status,
//   pricing: record.pricing,
//   mcc: record.mcc,
//   act_dat: record.act_date,
// };
// var merchantRes = await merchantUpsert(
//   merchantObj,
//   merchantData
// );
//                     // console.log(merchantRes);
//                   }
//                 })();
//                 return ReS(res, "done", CONFIG.SUCCESS_CODE);
//               } else {
//                 return ReE(res, CONFIG.INVALID_FILE, CONFIG.OK_CODE);
//               }
//             }
//           );
//         }
//       }
//     );
//   } catch (error) {
//     console.log(error);
//     return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
//   }
// }
function convertExcelDateToYourFormet(excelDate, formet) {
  var date = new Date(Math.round((excelDate - (25567 + 2)) * 86400 * 1000));
  var converted_date = date.toISOString().split("T")[0];
  return moment(converted_date, "YYYY-MM-DD").format(formet);
}
async function readExcelData(req, res) {
  try {
     
    await isPrmissionsForThisAPI(req, res, CONFIG.IMPORT_CSV);
    console.log("okokokokokokokokok::::::::");
    const pubicPath = path.resolve(__dirname, "..", "..", "..", "..");
    console.log(req.files);

    let startup_image = req.files.file;

    startup_image.mv(
      pubicPath + "/public/excel/" + req.files.file.name,
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Uploaded...");
          var workbook = XLSX.readFile(
            pubicPath + "/public/excel/" + req.files.file.name
          );
          var sheet_name_list = workbook.SheetNames;
          var xlData = XLSX.utils.sheet_to_json(
            workbook.Sheets[sheet_name_list[0]],
            {
              raw: true,
              dateNF: "DD-MMM-YYYY",
              header: 1,
              // defval: ""
            }
          );
          // res.send({data:xlData[10][8]})
          // console.log("vinay",xlData);

          // res.setHeader("Content-Type", "application/json");

          // res.send({
          var excelDate = xlData[0][2];
          // res.send({date:xlData[9][8]})
          (async function loop() {
            for (i = 8; i < xlData.length; i++) {
              let record = {
                merchant_id: xlData[i][0],
                merchant_name: xlData[i][1],
                status: xlData[i][2],
                act_date: xlData[i][3],
                mcc: xlData[i][6],
                pricing: xlData[i][7],
                deal_id: xlData[i][8],
                turn_over_credit: xlData[i][13],
                turn_over_eftpos: xlData[i][14],
                month: convertExcelDateToYourFormet(excelDate, "M"),
                // month: new Date().getMonth(),

                year: convertExcelDateToYourFormet(excelDate, "Y"),
                transaction_eftpos: xlData[i][22],
                transaction_total: xlData[i][23],
                transaction_refunds: xlData[i][24],
                credit_msc: xlData[i][26],
                epal_msc: xlData[i][27],
                mmsf: xlData[i][28],
                other_income: xlData[i][29],
                total_msc: xlData[i][30],
                credit_scheme_fees: xlData[i][32],
                credit_interchange: xlData[i][33],
                fd_margin: xlData[i][34],
                ecomm_transaction_fees: xlData[i][35],
                cp_epal_transaction_fees: xlData[i][36],
                total_processing_rates: xlData[i][37],
                min_merchant_service_fees: xlData[i][39],
                non_returned_terminal_fees: xlData[i][40],
                refunds: xlData[i][41],
                chargeback: xlData[i][42],
                closure: xlData[i][43],
                countertop_ip_dial: xlData[i][44],
                mobile_3G_wifi: xlData[i][45],
                integrated: xlData[i][46],
                total_other_rates: xlData[i][47],
                total_commission: xlData[i][49],
                sales_volume_domestic_visa: xlData[i][51],
                sales_volume_intl_mc: xlData[i][52],
                sales_volume_intl_visa: xlData[i][53],
                debit: xlData[i][54],
                transaction_count_domestic_mc: xlData[i][56],
                transaction_count_domestic_visa: xlData[i][57],
                transaction_count_intl_mc: xlData[i][58],
                transaction_count_intl_visa: xlData[i][59],
                transaction_count_debit: xlData[i][60],
                total_scheme_fees: xlData[i][61],
                excelDate: new Date(
                  convertExcelDateToYourFormet(excelDate, "DD-MM-YYYY")
                ),
                deal_merchant: xlData[i][63],
                deal_owner: xlData[i][64],
                credit_card_rate_blended: xlData[i][65],
                credit_card_rate_INT: xlData[i][66],
                deal_debit_card_rate: xlData[i][67],

                // terminal_rental:
                //   parseFloat(xlData[i][45]) +
                //   parseFloat(xlData[i][46]) +
                //   parseFloat(xlData[i][29]),
                // deal_comms_franchisee: xlData[i][13]*((dealData.including_gst/100/11)*10-),
                // deal_comms_state_office: xlData[i][70],
                // deal_comms_category_manager: xlData[i][71],
                // deal_comms_head_office: xlData[i][72],
                // deal_EFTPOS_bonus_head_office: xlData[i][73],
                // deal_totel: xlData[i][74],
                // deal_Discrepancy: xlData[i][74],
                // deal_per_based_EFTPOS: xlData[i][75],
                // deal_head_office: xlData[i][77],
              };
              record.totel_turn_over_credit_eftpos =
                parseFloat(record.turn_over_credit) +
                parseFloat(record.turn_over_eftpos);

              // console.log(record)
              const dealData = await db.deal.findOne({
                where: {
                  deal_id: xlData[i][8],
                },
                raw: true,
              });

              var merchant_name = record.merchant_name;
              var including_gst = dealData?.including_gst;
              var excluding_gst = dealData?.excluding_gst;
              var terminal_rental =
                record.mobile_3G_wifi + record.integrated + record.other_income;
              // var terminal_rental =
              //   record.mobile_3G_wifi +
              //   record.integrated +
              //   record.other_income;
              var franchise_commision =
                record.turn_over_credit *
                  ((including_gst / 100 / 11) * 10 -
                    dealData?.franchise_percentage / 100) +
                terminal_rental;
              var state_office_commission =
                (dealData?.franchise_percentage / 100 -
                  dealData?.state_office_percentage / 100) *
                record.turn_over_credit;
              var category_manager_commission =
                record.turn_over_credit *
                (dealData?.state_office_percentage / 100 -
                  dealData?.category_manager_percentage / 100);
              var hear_office_commission =
                record.total_commission -
                (franchise_commision +
                  state_office_commission +
                  category_manager_commission) +
                franchise_commision;
              var EFTPOS_bonus_head_office =
                (dealData?.excluding_gst - dealData?.debit_card_ex) *
                record.transaction_eftpos;
              var total =
                state_office_commission +
                category_manager_commission +
                hear_office_commission +
                EFTPOS_bonus_head_office;
              var discrepancy = total - record.total_commission;

              var eftpos =
                (dealData?.excluding_gst - dealData?.debit_card_ex) *
                record.transaction_eftpos;
              var headoffice = hear_office_commission + eftpos;

              record.terminal_rental = terminal_rental;
              record.deal_comms_franchisee = franchise_commision;
              record.deal_comms_state_office = state_office_commission;
              record.deal_comms_category_manager = category_manager_commission;
              record.deal_comms_head_office = hear_office_commission;
              record.deal_EFTPOS_bonus_head_office = EFTPOS_bonus_head_office;
              record.deal_totel = total;
              record.deal_Discrepancy = discrepancy;
              record.deal_per_based_EFTPOS = eftpos;
              record.deal_head_office = headoffice;

              console.log(
                ":::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::"
              );
              console.log("dealDate", dealData);
              // res.send({ data: "ok" });
              const merchantObj = await db.merchant.findOne({
                where: { merchant_id: record.merchant_id },
                attributes: ["merchant_id"],
                raw: true,
              });
              console.log("1");
              let merchantData = {
                merchant_name: record.merchant_name,
                merchant_id: record.merchant_id.toString(),
                merchant_status: record.status,
                pricing: record.pricing,
                mcc: record.mcc,
                act_dat: record.act_date,
              };
              console.log("2");

              var merchantRes = await merchantUpsert(merchantObj, merchantData);
              const commissionObj = await db.commission.findOne({
                where: {
                  [Op.and]: [
                    { excelDate: record.excelDate },
                    { merchant_id: record.merchant_id },
                  ],
                },
                attributes: ["id", "excelDate", "merchant_id"],
                raw: true,
              });
              console.log("3");

              var commissionRes = await commissionUpsert(commissionObj, record);
              // res.send(record)
            }
          })();
          return ReS(res, "done", CONFIG.SUCCESS_CODE);
        }
      }
    );
  } catch (error) {
    console.log(error);
    return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
  }
}
async function commissionUpsert(obj, record) {
  if (obj) {
    // console.log("console",record.deal_id)
    try {
      const data = await db.commission.update(record, {
        where: {
          [Op.and]: [
            { excelDate: record.excelDate },
            { merchant_id: record.merchant_id },
          ],
        },
        // raw: true,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  } else {
    const resData = await db.commission.create(
      record,
      { raw: true },
      { attributes: ["id"] }
    );

    console.log("yearMonth", record.month, record.year);
    //  console.log("resData",resData.dataValues.id)
    await db.monthlyMerchantCommission.create({
      merchant_id: record.merchant_id,
      commission_id: resData.dataValues.id,
      month: record.month,
      year: record.year,
    });

    // console.log("data",data.dataValues.id);
  }
}
async function merchantUpsert(obj, data) {
  try {
    if (!!obj) {
      await db.merchant.update(data, {
        where: {
          merchant_id: data.merchant_id,
        },
        raw: true,
      });

      // console.log("ex",obj)
    } else {
      // console.log("not", obj);

      await db.merchant.create(data, { raw: true }, { attributes: ["id"] });

      // console.log("create");
    }
  } catch (error) {
    console.log(error);
  }
}

function validateExcelFile(header) {
  console.log("length", header.length);
  result = false;
  checkarray = [
    null,
    "Merchant Name",
    "Status",
    "ACT Date",
    "Active Date",
    "CP/CNP",
    "MCC",
    "Pricing",
  ];
  if (header.length <= 8) {
    return result;
  }
  tempArr = header.slice(0, 8);
  console.log(tempArr, checkarray);
  result = arraysAreIdentical(tempArr, checkarray);
  return result;
}
function arraysAreIdentical(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (var i = 0, len = arr1.length; i < len; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}
async function generateCommisionSummary(req, res) {
  try {
    // try {
    //   userId = req.user.dataValues.id;
    //   const result = await roleAndPermissionChecker(
    //     userId,
    //     CONFIG.VIEW_COMMISSION_SUMMARY
    //   );
    //   if (result == 0) {
    //     return ReE(res, CONFIG.PERMISSION_ERROR, CONFIG.FORBIDDEN);
    //   } else if (result == 3) {
    //     return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
    // }
    let whereClause = {};
    let query = req.query;
    let perPage = parseInt(
      query.limit == undefined ? CONFIG.PERPAGE : query.limit
    ); // number of records per page
    let page = parseInt(query.page == undefined ? 1 : query.page); //page
    let offset = perPage * (page - 1);
    let endIndex = page * perPage;
    let keyword = query.keyword;

    whereClause = {
      [Op.and]: [
        {
          month: req.query.month.replace(/^0+/, ""),
        },
        { year: req.query.year },
      ],
    };

    if (keyword) {
      whereClause[Op.and].push({
        merchant_name: { [Op.like]: "%" + keyword.toLowerCase() + "%" },
      });
    }
    db.commission
      .findAndCountAll({
        where: whereClause,
        // attributes: ["id","merchant_name",],
        limit: perPage,
        offset: offset,
        order: [["createdAt", "DESC"]],
        raw: true,
      })
      .then((commission) => {
        if (commission) {
          return ReS(res, commission, CONFIG.SUCCESS_CODE);
        } else {
          return ReS(
            res,
            { commission, message: CONFIG.NO_DATA_FOUND },
            CONFIG.SUCCESS_CODE
          );
        }
      })
      .catch((error) => {
        console.log(error);
        return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
      });
    // if (req.query.month) {
    //   var [err, userData] = await to(
    //     db.commission.findAll({
    //       where: whereClause,
    //     })
    //   );

    //   var result = [];
    //   var notFoundedMerchants = [];

    //   var [err, systemConfig] = await to(db.systemConfiguration.findOne());
    //   // console.log(systemConfig)

    //   var franchise_percentage = systemConfig?.franchinse_commission;
    //   var state_office_percentage = systemConfig?.state_office_commission;
    //   var category_manager_percentage =
    //     systemConfig?.category_manager_commission;
    //   var debit_card_rate = systemConfig?.debit_card_ex;

    //   var i;
    //   for (i = 0; i < userData.length; i++) {
    //     // var [err, dealData] = await to(db.deal.findOne({
    //     //   where : { merchant_id : userData[i].merchant_id}
    //     // }));

    //     var [err, merchantData] = await to(
    //       db.merchant.findOne({
    //         where: { merchant_id: userData[i].merchant_id },
    //         attributes: ["id"],
    //       })
    //     );
    //     if (merchantData) {
    //       var [err, dealData] = await to(
    //         db.deal.findOne({
    //           where: { merchant_id: merchantData.id },
    //         })
    //       );
    //     }
    //     if (dealData && merchantData) {
    //       var merchant_name = userData[i].merchant_name;
    //       var including_gst = dealData?.including_gst;
    //       var excluding_gst = dealData?.excluding_gst;
    //       var terminal_rental =
    //         userData[i].mobile_3G_wifi +
    //         userData[i].integrated +
    //         userData[i].other_income;
    //       //var terminal_rental = (userData[0].mobile_3G_wifi + userData[0].integrated ) + userData[0].other_income;
    //       var franchise_commision =
    //         userData[i].turn_over_credit *
    //           ((including_gst / 100 / 11) * 10 - franchise_percentage / 100) +
    //         terminal_rental;
    //       var state_office_commission =
    //         userData[i].turn_over_credit *
    //         (franchise_percentage / 100 - state_office_percentage / 100);
    //       var category_manager_commission =
    //         userData[i].turn_over_credit *
    //         (state_office_percentage / 100 - category_manager_percentage / 100);
    //       var hear_office_commission =
    //         userData[i].total_commission -
    //         (franchise_commision +
    //           state_office_commission +
    //           category_manager_commission) +
    //         franchise_commision;
    //       var total =
    //         state_office_commission +
    //         category_manager_commission +
    //         hear_office_commission;
    //       var discrepancy = total - userData[i].total_commission;
    //       var eftpos =
    //         (excluding_gst - debit_card_rate) * userData[i].transaction_eftpos;
    //       var headoffice = hear_office_commission + eftpos;

    //       result.push({
    //         merchant_name: merchant_name,
    //         including_gst: including_gst.toFixed(2),
    //         excluding_gst: excluding_gst.toFixed(2),
    //         terminal_rental: terminal_rental.toFixed(2),
    //         franchise_commision: franchise_commision.toFixed(2),
    //         state_office_commission: state_office_commission.toFixed(2),
    //         category_manager_commission: category_manager_commission.toFixed(2),
    //         hear_office_commission: hear_office_commission.toFixed(2),
    //         total: total.toFixed(2),
    //         discrepancy: discrepancy.toFixed(2),
    //         eftpos: eftpos.toFixed(2),
    //         headoffice: headoffice.toFixed(2),
    //       });
    //       // console.log("result", result);
    //     } else {
    //       notFoundedMerchants.push({ merchant_id: userData[i].merchant_id });
    //       //console.log("dealdata not found", notFoundedMerchants);
    //     }
    //   }

    //   const resultUser = result.slice(offset, endIndex);
    //   const mergedResponse = {
    //     userData: resultUser,

    //     notFoundedMerchants: notFoundedMerchants,
    //   };

    //   if (err) return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
    //   //return ReS(res, userData, CONFIG.SUCCESS_CODE);
    //   return ReS(
    //     res,
    //     {
    //       success: true,
    //       error: null,
    //       count: result.length,
    //       message: CONFIG.SUCCESS_RESULT,
    //       payload: mergedResponse,
    //     },
    //     CONFIG.SUCCESS_CODE
    //   );
    // } else {
    //   return ReE(res, CONFIG.MONTH_REQUIRED, CONFIG.ERROR_CODE);
    // }
  } catch (error) {
    console.log(error);
    return ReE(res, error, CONFIG.ERROR_CODE);
  }
}

// async function generateCommisionSummary(req, res) {
//   try {
//     try {
//       userId = req.user.dataValues.id;
//       const result = await roleAndPermissionChecker(
//         userId,
//         CONFIG.VIEW_COMMISSION_SUMMARY
//       );
//       if (result == 0) {
//         return ReE(res, CONFIG.PERMISSION_ERROR, CONFIG.FORBIDDEN);
//       } else if (result == 3) {
//         return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
//       }
//     } catch (error) {
//       console.log(error);
//       return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
//     }
//     let whereClause = {};
//     let query = req.query;
//     let perPage = parseInt(
//       query.limit == undefined ? CONFIG.PERPAGE : query.limit
//     ); // number of records per page
//     let page = parseInt(query.page == undefined ? 1 : query.page); //page
//     let offset = perPage * (page - 1);
//     let endIndex = page * perPage;
//     let keyword = query.keyword;

//     whereClause = {
//       [Op.and]: [
//         Sequelize.where(
//           Sequelize.fn("month", Sequelize.col("created_at")),
//           "=",
//           req.query.month
//         ),
//         Sequelize.where(
//           Sequelize.fn("YEAR", Sequelize.col("created_at")),
//           "=",
//           req.query.year
//         ),
//       ],
//     };

//     if (keyword) {
//       whereClause[Op.and].push({
//         merchant_name: { [Op.like]: "%" + keyword.toLowerCase() + "%" },
//       });
//     }

//     if (req.query.month) {
//       var [err, userData] = await to(
//         db.commission.findAll({
//           where: whereClause,
//         })
//       );

//       var result = [];
//       var notFoundedMerchants = [];

//       var [err, systemConfig] = await to(db.systemConfiguration.findOne());
//       // console.log(systemConfig)

//       var franchise_percentage = systemConfig?.franchinse_commission;
//       var state_office_percentage = systemConfig?.state_office_commission;
//       var category_manager_percentage =
//         systemConfig?.category_manager_commission;
//       var debit_card_rate = systemConfig?.debit_card_ex;

//       var i;
//       for (i = 0; i < userData.length; i++) {
//         // var [err, dealData] = await to(db.deal.findOne({
//         //   where : { merchant_id : userData[i].merchant_id}
//         // }));

//         var [err, merchantData] = await to(
//           db.merchant.findOne({
//             where: { merchant_id: userData[i].merchant_id },
//             attributes: ["id"],
//           })
//         );
//         if (merchantData) {
//           var [err, dealData] = await to(
//             db.deal.findOne({
//               where: { merchant_id: merchantData.id },
//             })
//           );
//         }
//         if (dealData && merchantData) {
//           var merchant_name = userData[i].merchant_name;
//           var including_gst = dealData?.including_gst;
//           var excluding_gst = dealData?.excluding_gst;
//           var terminal_rental =
//             userData[i].mobile_3G_wifi +
//             userData[i].integrated +
//             userData[i].other_income;
//           //var terminal_rental = (userData[0].mobile_3G_wifi + userData[0].integrated ) + userData[0].other_income;
//           var franchise_commision =
//             userData[i].turn_over_credit *
//               ((including_gst / 100 / 11) * 10 - franchise_percentage / 100) +
//             terminal_rental;
//           var state_office_commission =
//             userData[i].turn_over_credit *
//             (franchise_percentage / 100 - state_office_percentage / 100);
//           var category_manager_commission =
//             userData[i].turn_over_credit *
//             (state_office_percentage / 100 - category_manager_percentage / 100);
//           var hear_office_commission =
//             userData[i].total_commission -
//             (franchise_commision +
//               state_office_commission +
//               category_manager_commission) +
//             franchise_commision;
//           var total =
//             state_office_commission +
//             category_manager_commission +
//             hear_office_commission;
//           var discrepancy = total - userData[i].total_commission;
//           var eftpos =
//             (excluding_gst - debit_card_rate) * userData[i].transaction_eftpos;
//           var headoffice = hear_office_commission + eftpos;

//           result.push({
//             merchant_name: merchant_name,
//             including_gst: including_gst.toFixed(2),
//             excluding_gst: excluding_gst.toFixed(2),
//             terminal_rental: terminal_rental.toFixed(2),
//             franchise_commision: franchise_commision.toFixed(2),
//             state_office_commission: state_office_commission.toFixed(2),
//             category_manager_commission: category_manager_commission.toFixed(2),
//             hear_office_commission: hear_office_commission.toFixed(2),
//             total: total.toFixed(2),
//             discrepancy: discrepancy.toFixed(2),
//             eftpos: eftpos.toFixed(2),
//             headoffice: headoffice.toFixed(2),
//           });
//           // console.log("result", result);
//         } else {
//           notFoundedMerchants.push({ merchant_id: userData[i].merchant_id });
//           //console.log("dealdata not found", notFoundedMerchants);
//         }
//       }

//       const resultUser = result.slice(offset, endIndex);
//       const mergedResponse = {
//         userData: resultUser,

//         notFoundedMerchants: notFoundedMerchants,
//       };

//       if (err) return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
//       //return ReS(res, userData, CONFIG.SUCCESS_CODE);
//       return ReS(
//         res,
//         {
//           success: true,
//           error: null,
//           count: result.length,
//           message: CONFIG.SUCCESS_RESULT,
//           payload: mergedResponse,
//         },
//         CONFIG.SUCCESS_CODE
//       );
//     } else {
//       return ReE(res, CONFIG.MONTH_REQUIRED, CONFIG.ERROR_CODE);
//     }
//   } catch (error) {
//     console.log(error);
//     return ReE(res, error, CONFIG.ERROR_CODE);
//   }
// }

// async function isEmailExist(email) {
//   let users = await db.adminUser.findAndCountAll({
//     where: {
//       email: email,
//       status: { [Op.ne]: CONFIG.RECORD_DELETED },
//     },
//   });
//   return users.count > 0 ? true : false;
// }

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

async function forgotPassword(req, res, next) {
  try {
    var body = req.body;
    //check email already exist or not
    let isUserExist = await isEmailExist(req.body.email);
    // let userData = await db.adminUser.findOne({
    //     where: {
    //         email: { [Op.eq]: body.email },
    //         status: { [Op.ne]: [CONFIG.RECORD_DELETED] },
    //     },
    // });
    if (isUserExist) {
      let datToUpdate = {};
      let userName = "";
      let userData = await db.adminUser.findOne({
        where: {
          email: { [Op.eq]: body.email },
          status: { [Op.ne]: [CONFIG.RECORD_DELETED] },
        },
      });
      if (userData.firstName != null && userData.lastName != null) {
        userName = userData.firstName + " " + userData.lastName;
      }
      datToUpdate.passResetCode = uuidv4();
      datToUpdate.passKeyExpires = moment()
        .add(CONFIG.RESET_PASSWORD_CODE_EXPIRE_TIME, "minutes")
        .toDate();
      // res.send(datToUpdate)
      await db.adminUser.update(datToUpdate, {
        where: {
          id: userData.id,
        },
      });
      let link =
        process.env.WEB_RESET_BASE_URL + "/" + datToUpdate.passResetCode;
      EmailSender.sendResetPasswordCode(body.email, userName, link)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
      return ReS(
        res,
        {
          success: true,
        },
        CONFIG.SUCCESS_CODE
      );
    } else {
      let err = {
        message: CONFIG.EMAIL_NOT_FOUND,
      };
      ReE(res, err, CONFIG.OK_CODE);
      return;
    }
  } catch (error) {
    console.log(error);
    return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
  }
}

async function setPassword(req, res, next) {
  try {
    let reqData = req.body;
    let userData = await db.adminUser.findOne({
      where: {
        passResetCode: reqData.code,
      },
    });
    if (userData != null) {
      userData = userData.dataValues;
      let now = moment();
      let keyExpiration = moment(userData.passKeyExpires);
      if (keyExpiration > now) {
        let toUpdateData = {};
        toUpdateData.password = bcrypt.hashSync(
          reqData.password,
          bcrypt.genSaltSync(10),
          null
        );
        toUpdateData.passResetCode = null;
        toUpdateData.passKeyExpires = null;
        await db.adminUser.update(toUpdateData, {
          where: {
            id: userData.id,
          },
        });
        return ReS(res, {}, CONFIG.OK_CODE);
      } else {
        let err = {
          message: CONFIG.CODE_EXPIRED,
        };
        return ReE(res, err, CONFIG.OK_CODE);
      }
    } else {
      let err = {
        message: CONFIG.CODE_INVALID,
      };
      return ReE(res, err, CONFIG.OK_CODE);
    }
  } catch (error) {
    console.error;
    return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
  }
}

// try {
//   userId = req.user.dataValues.id;
//   const result = await roleAndPermissionChecker(userId, CONFIG.VIEW_USER);
//   if (result == 0) {
//     return ReE(res, CONFIG.PERMISSION_ERROR, CONFIG.FORBIDDEN);
//   } else if (result == 3) {
//     return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
//   }
// } catch (error) {
//   console.log(error);
//   return ReE(res, CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_CODE);
// }
