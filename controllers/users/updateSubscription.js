const { User } = require("../../models");
const { STATUS_CODES } = require("../../middlewares");

const { OK } = STATUS_CODES;

const updateSubscription = async (req, res) => {
  const { _id: id } = req.user;
  const { subscription } = req.body;

  await User.findById(id, { subscription }, { new: true });

  res.json({
    status: "success",
    code: OK,
    data: {
      subscription,
    },
  });
};

module.exports = updateSubscription;
