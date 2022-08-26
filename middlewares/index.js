const { validationPost, validationUpdate } = require("./validation");
const validateId = require("./validationId");
const ctrlWrapper = require("./ctrlWrapper");
const auth = require("./auth");

module.exports = {
  validateId,
  validationPost,
  validationUpdate,
  ctrlWrapper,
  auth,
};
