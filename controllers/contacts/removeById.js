const { NotFound } = require("http-errors");
const { removeContact } = require("../../models/contacts");

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact();

  if (!contact) {
    throw NotFound(`Contact with id(${contactId}) not found`);
  }

  res.json({
    status: "success",
    code: 200,
    message: "contact delete",
    data: {
      result: contact,
    },
  });
};

module.exports = removeById;
