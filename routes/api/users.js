const express = require("express");

const { users: ctrl } = require("../../controllers");

const {
  auth,
  upload,
  ctrlWrapper,
  validationUpdate,
  validationVerify,
} = require("../../middlewares");
const { subscriptionJoiSchema, joiVerifyEmailSchema } = require("../../models");
const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch(
  "/subscription",
  auth,
  validationUpdate(subscriptionJoiSchema),
  ctrlWrapper(ctrl.updateSubscription)
);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

router.post(
  "/verify",
  validationVerify(joiVerifyEmailSchema),
  ctrlWrapper(ctrl.resendVerifyEmail)
);

module.exports = router;
