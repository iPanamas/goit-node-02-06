const { Contact } = require("../../models");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getById;
