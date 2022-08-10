const { addContact } = require("../../models/contacts");

const addNew = async (req, res, next) => {
  const contact = await addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      contact,
    },
  });
};

module.exports = addNew;
