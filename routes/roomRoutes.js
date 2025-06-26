const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
const roomController = require("../controllers/roomController");
const checkRoomPermissions = require("../middlewares/checkRoomPermissions");

router.get(
  "/rooms",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  roomController.getAllRooms
);
router.get("/rooms/:Id", roomController.getRoomById);
router.post(
  "/rooms",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  checkRoomPermissions,
  roomController.createRoom
);
router.patch(
  "/rooms/:Id",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  checkRoomPermissions,
  roomController.updateRoom
);
router.delete(
  "/rooms/:Id",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  checkRoomPermissions,
  roomController.deleteRoom
);

module.exports = router;
