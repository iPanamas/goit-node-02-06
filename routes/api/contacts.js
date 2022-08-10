const express = require("express");
const { contacts: ctrl } = require("../../controllers");
const router = express.Router();
const { validation, ctrlWrapper } = require("../../middlewares");
const { contactsSchema } = require("../../schemas");

const validateMiddleware = validation(contactsSchema);

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validateMiddleware, ctrlWrapper(ctrl.addNew));

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

router.put("/:contactId", validateMiddleware, ctrlWrapper(ctrl.putById));

module.exports = router;
