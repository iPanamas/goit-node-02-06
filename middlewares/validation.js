const { BadRequest, NotFound } = require("http-errors");
const { isValidObjectId } = require("mongoose");

const validationPost = (schema) => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new BadRequest("missing required fields");
    }
    next();
  };
};

const validationUpdate = (schema) => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new BadRequest("Invalid value");
    }
    next();
  };
};

const validationVerify = (schema) => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new BadRequest("missing required fields");
    }
    next();
  };
};

const validateId = (req, res, next) => {
  const { contactId } = req.params;
  const isValid = isValidObjectId(contactId);

  if (!isValid) {
    next(NotFound(`Contact with id(${contactId}) not found`));
    return;
  }
  next();
};

module.exports = {
  validationPost,
  validationUpdate,
  validationVerify,
  validateId,
};
