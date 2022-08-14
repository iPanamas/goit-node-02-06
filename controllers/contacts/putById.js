const { updateContact } = require("../../models/contacts");
const { NotFound } = require("http-errors");

const putById = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await updateContact(contactId, req.body);

  if (!contact) {
    throw NotFound(`Contact with id(${contactId}) not found`);
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      contact,
    },
  });
};

module.exports = putById;
