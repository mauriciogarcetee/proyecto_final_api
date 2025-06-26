async function getMainMenu(req, res, next) {
  try {
    res.json({
      message: "Welcome to the main menu",
      options: [
        { name: "Bookings", path: "/bookings" },
        { name: "Users", path: "/users" },
        { name: "bookings", path: "/bookings" },
      ],
    });
  } catch (err) {
    next(err);
  }
}
module.exports = {
  getMainMenu,
};
