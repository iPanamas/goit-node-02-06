const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const { joiContactSchema, favoriteJoiSchema } = require("../../models");
const {
  ctrlWrapper,
  validationPost,
  validationUpdate,
  validateId,
  auth,
} = require("../../middlewares");

router.get("/", auth, ctrlWrapper(ctrl.getAll));
router.get("/:contactId", validateId, ctrlWrapper(ctrl.getById));
router.post(
  "/",
  auth,
  validationPost(joiContactSchema),
  ctrlWrapper(ctrl.addNew)
);
router.delete("/:contactId", validateId, ctrlWrapper(ctrl.removeById));
router.put(
  "/:contactId",
  validateId,
  validationUpdate(joiContactSchema),
  ctrlWrapper(ctrl.putById)
);
router.patch(
  "/:contactId/favorite",
  validateId,
  validationUpdate(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
