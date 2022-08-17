const { validationPost, validationUpdate } = require("./validation");
const validateId = require("./validationId");
const ctrlWrapper = require("./ctrlWrapper");

module.exports = {
  validateId,
  validationPost,
  validationUpdate,
  ctrlWrapper,
};
