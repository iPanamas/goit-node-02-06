const { BadRequest } = require("http-errors");

const validationPost = (schema) => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new BadRequest("missing required name field");
    }
    next();
  };
};

const validationPut = (schema) => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new BadRequest("missing fields");
    }
    next();
  };
};

module.exports = {
  validationPost,
  validationPut,
};
