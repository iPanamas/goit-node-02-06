const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const {
  ctrlWrapper,
  validationPost,
  validationPut,
} = require("../../middlewares");

const { contactsSchema } = require("../../schemas");

const validateMiddlewarePost = validationPost(contactsSchema);
const validateMiddlewarePut = validationPut(contactsSchema);

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validateMiddlewarePost, ctrlWrapper(ctrl.addNew));

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

router.put("/:contactId", validateMiddlewarePut, ctrlWrapper(ctrl.putById));

module.exports = router;
