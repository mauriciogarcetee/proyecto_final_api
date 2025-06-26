const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
const bookingController = require("../controllers/bookingController");
const checkUserPermissions = require("../middlewares/checkUserPermissions");
const checkBookingPermissions = require("../middlewares/checkBookingPermissions");

router.get("", mainMenuController.getMainMenu);

module.exports = router;
