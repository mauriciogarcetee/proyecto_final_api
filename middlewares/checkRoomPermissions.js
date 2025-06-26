const { User } = require("../models/index.js");

async function checkRoomPermissions(req, res, next) {
  try {
    const userId = req.auth.Id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "admin") {
      return next();
    }

    return res.status(403).json({
      message: "Forbidden: You do not have permission to edit this resource",
    });
  } catch (error) {
    console.error("Error in checkUserPermissions middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = checkRoomPermissions;
