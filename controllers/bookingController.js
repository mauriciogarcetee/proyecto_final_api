const { Booking, Room, User } = require("../models/index.js");

const createBooking = async (req, res) => {
  const userId = req.auth.Id;
  try {
    const result = await Booking.create({
      date: req.body.date,
      roomId: req.body.roomId,
      userId: userId,
    });
    return res.status(201).json(result);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getAllBookings = async (req, res) => {
  try {
    const userId = req.auth.Id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.role === "admin") {
      const bookings = await Booking.findAll();
      res.status(200).json(bookings);
    } else {
      const bookings = await Booking.findAll({
        where: { userId: userId },
      });
      res.status(200).json(bookings);
      no;
    }
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.Id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.Id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    const { date, userId, roomId } = req.body;
    booking.date = date || booking.date;
    booking.userId = userId || booking.userId;
    booking.roomId = roomId || booking.roomId;
    await booking.save();
    res.status(200).json(booking);
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.Id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    await booking.destroy();
    res.json({ message: "Booking deleted" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
