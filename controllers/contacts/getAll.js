const { Contact } = require("../../models");
const { STATUS_CODES } = require("../../helpers");
const { OK } = STATUS_CODES;

const getAll = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({ owner: _id }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");

  res.json({
    status: "success",
    code: OK,
    data: {
      result,
    },
  });
};

module.exports = getAll;
