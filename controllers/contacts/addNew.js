const { Contact } = require("../../models");

const addNew = async (req, res, next) => {
  const result = await Contact.create(req.body);

  if (result)
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
};

module.exports = addNew;
