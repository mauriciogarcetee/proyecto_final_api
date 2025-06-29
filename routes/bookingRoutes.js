const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
const bookingController = require("../controllers/bookingController");
const checkUserPermissions = require("../middlewares/checkUserPermissions");
const checkBookingPermissions = require("../middlewares/checkBookingPermissions");

router.get(
  "/bookings",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  bookingController.getAllBookings
);
router.get(
  "/bookings/:Id",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  checkBookingPermissions,
  bookingController.getBookingById
);
router.post(
  "/bookings",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  bookingController.createBooking
);
router.patch(
  "/bookings/:Id",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  checkBookingPermissions,
  bookingController.updateBooking
);
router.delete(
  "/bookings/:Id",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  checkBookingPermissions,
  bookingController.deleteBooking
);

module.exports = router;
