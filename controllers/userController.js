const { User } = require("../models/index.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const checkUserPermissons = require("../middlewares/checkUserPermissions.js");

async function getAllUsers(req, res) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
}
async function getUserById(req, res, next) {
  const user = await User.findByPk(req.params.id);
  try {
    if (user == null) {
      res.json({ message: "User not found" });
      error.status = 404;
      throw error;
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
}
async function createUser(req, res, next) {
  try {
    const hash = await bcryptjs.hash(req.body.password, 10);
    const result = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hash,
    });
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}
async function updateUser(req, res, next) {
  const user = await User.findByPk(req.params.Id);
  try {
    if (user == null) {
      res.json({ message: "User not found" });
      error.status = 404;
      throw error;
    } else {
      const hash = await bcryptjs.hash(req.body.password, 10);
      user.firstname = req.body.firstname ? req.body.firstname : user.firstname;
      user.lastname = req.body.lastname ? req.body.lastname : user.lastname;
      user.email = req.body.email ? req.body.email : user.email;
      user.password = hash ? hash : user.password;
      await user.save();
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
}
async function deleteUser(req, res, next) {
  const user = await User.findByPk(req.params.id);
  try {
    if (user == null) {
      res.json({ message: "User not found" });
      error.status = 404;
      throw error;
    } else {
      await user.destroy();
      res.json({ message: "User deleted successfully" });
    }
  } catch (err) {
    next(err);
  }
}
async function authenticateUser(req, res, next) {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      const token = jwt.sign(
        { Id: user.Id, role: user.email },
        process.env.JWT_SECRET
      );
      const compare = await bcryptjs.compare(req.body.password, user.password);
      if (compare) {
        return res.json(
          "User " +
            user.firstname +
            " logged in successfully,your token is:" +
            token
        );
      } else {
        return res.status(401).json({ message: "Invalid password" });
      }
    }
  } catch (err) {
    next(err);
  }
}
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  authenticateUser,
};
