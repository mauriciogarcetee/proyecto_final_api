const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
const userController = require("../controllers/userController");
const checkUserPermissions = require("../middlewares/checkUserPermissions");

router.get(
  "/users",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  checkUserPermissions,
  userController.getAllUsers
);
router.get("/users/:Id", userController.getUserById);
router.post("/users", userController.createUser);
router.patch(
  "/users/:Id",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  checkUserPermissions,
  userController.updateUser
);
router.delete("/users/:Id", userController.deleteUser);
router.post("/auth/login", userController.authenticateUser);
module.exports = router;
