const {
  validationPost,
  validationUpdate,
  validationVerify,
} = require("./validation");
const validateId = require("./validationId");
const ctrlWrapper = require("./ctrlWrapper");
const auth = require("./auth");
const upload = require("./upload");
const STATUS_CODES = require("./codeStatus");
const createFolderIsNotExist = require("./createFolder");

module.exports = {
  validateId,
  validationPost,
  validationUpdate,
  validationVerify,
  ctrlWrapper,
  auth,
  upload,
  STATUS_CODES,
  createFolderIsNotExist,
};
