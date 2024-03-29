const { Config } = require("aws-sdk");

CONFIG = {}; //Make this global to use all over the application

CONFIG.RESET_PASSWORD_CODE_EXPIRE_TIME = 10;

CONFIG.JWT_SECRET = "cart-n-camera-security";
CONFIG.JWT_PRE_TOKEN = "Bearer ";
CONFIG.APP_USER = "APP_USER";
CONFIG.ORDER_PRE_TEXT = "OD";

// API CODES
CONFIG.SUCCESS_CODE = 201;
CONFIG.CREATE_CODE = 201;
CONFIG.OK_CODE = 200;
CONFIG.SUCCESS_APPOINTMENT_CODE = 202;
CONFIG.ERROR_CODE = 422;
CONFIG.ERROR_PERMISSION_CODE = 405;
CONFIG.ERROR_CODE_BLOCKED_USER = 450;
CONFIG.ERROR_CODE_DELETED_USER = 451;
CONFIG.ERROR_CODE_APP_UPDATE = 452;
CONFIG.SUCCESS_CODE = 200;
CONFIG.DATA_NOT_FOUND = 404;
CONFIG.FORBIDDEN = 403;
CONFIG.BAD_REQUEST = 400;
CONFIG.INTERNAL_SERVER_ERROR_CODE = 500;
CONFIG.ERROR_CODE = 422;
CONFIG.INVALID_SESSION = 101;
CONFIG.ALREADY_EXISTS = 409;

// FOR GLOBAL LISTING
CONFIG.PERPAGE = 10;
CONFIG.RESULT_FOUND_MESSAGE = "Result found";
CONFIG.USER_CREATED_MESSAGE = "User Created..";
CONFIG.NO_DATA_FOUND_MESSAGE = "No data found";
CONFIG.DEFAULT_SORT_NAME = "createdAt";
CONFIG.DEFAULT_SORT_ORDER = "DESC";
CONFIG.BAD_REQUEST_MESSAGE = "Bad request";

//RECORD STATUS
CONFIG.RECORD_ACTIVE = 1;
CONFIG.RECORD_DELETED = 0;
CONFIG.RECORD_INACTIVE = 2;

//PRODUCT STATUS
CONFIG.PRODUCT_ORDER_IN_PROGRESS = 1;
CONFIG.PRODUCT_ORDER_COMPLETED = 0;

//ORDER STATUS
CONFIG.PREPAID_ORDER_RECEIVED = 0;
CONFIG.WORK_IN_PROGRESS = 1;
CONFIG.AWAITING_CLARIFICATION = 2;
CONFIG.ORDER_COMPLETED = 3;
CONFIG.ORDER_CANCEL = 4;
CONFIG.ORDER_STATUS_CHANGE = "Your order status has been changed";
// COMMON MESSAGES
CONFIG.SUCCESS_RESULT = "Result found";
CONFIG.ADD_TO_CART_DONE = "Product Added ";
CONFIG.ACCESS_DENIED = "Access denied";
CONFIG.INTERNAL_SERVER_ERROR =
  "Internal server error, please try after some time";

CONFIG.NO_DATA_FOUND_MESSAGE = "No data found";
CONFIG.STATUS_INVALID = "Invalid Status";

//USER MESSAGES
CONFIG.USER_CREATE_ERROR = "Unable to create user, please try again";
CONFIG.USER_CREATE_SUCCESS = "User created successfully";
CONFIG.USER_ALREADY_EXIST =
  "An account already exists with this email ID. Please use another email ID to create a new account or login to the existing account with the password or social login option";
CONFIG.USERNAME_ALREADY_EXIST = "An username is not available";
CONFIG.USER_EMAIL_REQUIRED = "Email is required";
CONFIG.USER_PASSWORD_REQUIRED = "Password is required";
CONFIG.EMAIL_NOT_EXIST = "Your email does not exist";
CONFIG.ERR_ACCOUNT_BLOCKED = "Your account is deactivated";
CONFIG.INVALID_LOGIN = "Invalid email or password";
CONFIG.EMAIL_NOT_FOUND =
  "Invalid email address! Please enter registered email address";
CONFIG.EMAIL_WITH_SOCIAL =
  "Reset password feature in not available for social login (login done with Facebook, Linkedin, Apple or Google)";
CONFIG.APP_USER_FORGOTPASSOWRD_ERROR =
  "Unable to forgot password, please try again";
CONFIG.CODE_EXPIRED = "Your code is expired";
CONFIG.CODE_INVALID = "Invalid code. Please enter valid code";
CONFIG.APP_USERID_REQUIRED = "App userId is required";
CONFIG.PROFILE_USER_ID_NOT_FOUND = "User not found";
CONFIG.APP_USER_PROFILE_UPDATE_ERROR =
  "Unable to update profile details, please try again";
CONFIG.USER_INVALID_PASSWORD_MESSAGE = "Please enter correct password";
//ADMIN-USER MESSAGES
CONFIG.INVALID_REQUEST = "Invalid request";
CONFIG.SET_PASSWORD = "Your account is not activated. Please check your email.";
CONFIG.NO_DATA_FOUND = "No data found";
CONFIG.ADMIN_ALREADY_EXIST = "An account already exists with this email ID";
CONFIG.HEAD_OFFICE_ALREADY_EXIST = "HeadOffice already exists ";
CONFIG.CATEGORY_OFFICE_ALREADY_EXIST = "category already exists ";
CONFIG.STATE_OFFICE_ALREADY_EXIST = "state already exists ";
CONFIG.HEAD_OFFICE_MAPPING_ALREADY_EXIST =
  "HeadOffice mapping is already exists ";
CONFIG.CATEGORY_MAPPING_ALREADY_EXIST = "Category mapping is already exists ";
CONFIG.STATE_MAPPING_ALREADY_EXIST = "State mapping is already exists ";
CONFIG.FRANCHISE_ALREADY_EXIST = "Franchise mapping is already exists ";
CONFIG.FILE_UPLOAD = "File Uploaded";
//COUPON
CONFIG.COUPON_CREATE_ERROR = "Unable to create coupon, please try again";
CONFIG.COUPON_UPDATE_ERROR =
  "Unable to update coupon details, please try again";
CONFIG.COUPON_STATUS_INVALID = "Coupon Status is invalid";
CONFIG.COUPON_CODE_ALREADY_EXIST =
  "Coupon code already exists Please use another Coupon code ";
CONFIG.INVALID_COUPON_CODE = "Coupon code is invalid";

//SYSTEM SETTINGS
CONFIG.SYSTEM_SETTING_UPDATE_ERROR =
  "Unable to update system setting, please try again";

//SERVICES
CONFIG.SERVICES_UPDATE_ERROR = "Unable to update services, please try again";
CONFIG.SERVICES_STATUS_INVALID = "Services Status is invalid";

//PRODUCT
CONFIG.PRODUCT_CREATE_ERROR = "Unable to create product, please try again";
CONFIG.PRODUCT_UPDATE_ERROR = "Unable to update product, please try again";
CONFIG.PRODUCT_STATUS_INVALID = "Product Status is invalid";

//HELP
CONFIG.HELP_CREATE_ERROR = "Unable to create help, please try again";

//ORDER
CONFIG.ORDER_CREATE_ERROR = "Unable to create order, please try again";
CONFIG.ORDER_STATUS_INVALID = "Order Status is invalid";

CONFIG.MONTH_REQUIRED = "Please pass the month parameter in query string";

CONFIG.MERCHANT_ALREADY_EXIST =
  "A MERCHANT is already exists with this merchant_ID";
CONFIG.MERCHANT_ALREADY_EXIST_EMAIL =
  "A MERCHANT is already exists with this contect_email";
CONFIG.APP_MERCHANT_PROFILE_UPDATE_ERROR =
  "Unable to update MERCHANT profile details, please try again";
CONFIG.PROFILE_MERCHANT_ID_NOT_FOUND = "MERCHANT not found";

CONFIG.ACTIVE_MERCHANT = "Active";
CONFIG.INACTIVE_MERCHANT = "Inactive";
CONFIG.CLOSED_APPLY_FEE_MERCHANT = "ClosedApplyFee";

CONFIG.APP_DEAL_UPDATE_ERROR =
  "Unable to update Deal details, please try again";
CONFIG.PROFILE_DEAL_ID_NOT_FOUND = "Deal not found";

CONFIG.APP_SYSTEM_CONFIGURATION_UPDATE_ERROR =
  "Unable to update systemConfiguration , please try again";

CONFIG.ROLE_ALREADY_EXIST = "role is already exist";
CONFIG.APP_ROLE_UPDATE_ERROR = "Unable to role details, please try again";
CONFIG.ROLE_ID_NOT_FOUND = "Role not found";
CONFIG.SUCCESS_ROLE_DELETED = "Role Deleted ";
CONFIG.PERMISSION_ERROR = "you have not permission to access this Api";



CONFIG.PRODUCT = "PRODUCT";
CONFIG.ADD_PRODUCT = "ADD_PRODUCT";
CONFIG.EDIT_PRODUCT = "EDIT_PRODUCT";
CONFIG.VIEW_PRODUCT = "VIEW_PRODUCT";
CONFIG.DELETE_PRODUCT = "DELETE_PRODUCT";
CONFIG.CART = "CART";
CONFIG.ADD_TO_CART = "ADD_TO_CART";
CONFIG.REMOVE_FROM_CART = "REMOVE_FROM_CART";
CONFIG.PERMISSIONS = "PERMISSIONS";
CONFIG.ADD_ROLE_AND_PERMISSION = "ADD_ROLE_AND_PERMISSION";
CONFIG.EDIT_ROLE_AND_PERMISSIONS = "EDIT_ROLE_AND_PERMISSIONS";
CONFIG.VIEW_CART = "VIEW_CART";
CONFIG.USERS = "USERS";
CONFIG.VIEW_USERS = "VIEW_USERS";
CONFIG.ROLE_ASSIGN = "ROLE_ASSIGN";
CONFIG.VIEW_PERMISSIONS = "VIEW_PERMISSIONS";