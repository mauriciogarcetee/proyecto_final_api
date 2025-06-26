const { Room } = require("../models/index.js");
const { Op } = require("sequelize");

const createRoom = async (req, res) => {
  //Validar que projectores sea 0 o 1
  if (req.body.projector !== undefined) {
    if (req.body.projector !== 0 && req.body.projector !== 1) {
      return res.status(400).json({
        message: "Projector must be 0 (false) or 1 (true)",
      });
    }
  }
  try {
    const result = await Room.create({
      projector: req.body.projector,
      boxes: req.body.boxes,
      capacity: req.body.capacity,
    });
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};
const getAllRooms = async (req, res) => {
  try {
    const filters = {};

    // Filtrar por proyector (true o false)
    if (req.query.has_projector !== undefined) {
      filters.projector = req.query.has_projector === "1";
    }
    // Filtrar por call boxes (true o false)
    if (req.query.has_call_boxes !== undefined) {
      filters.boxes = req.query.has_call_boxes === "1" ? { [Op.gt]: 0 } : 0;
    }
    // Capacidad maxima
    if (
      req.query.max_capacity !== undefined &&
      !isNaN(parseInt(req.query.max_capacity))
    ) {
      filters.capacity = { [Op.lte]: parseInt(req.query.max_capacity, 10) };
    }
    // Capacidad minima
    if (
      req.query.min_capacity !== undefined &&
      !isNaN(parseInt(req.query.min_capacity))
    ) {
      filters.capacity = { [Op.gte]: parseInt(req.query.min_capacity, 10) };
    }
    // Buscar
    const rooms = Object.keys(filters).length
      ? await Room.findAll({ where: filters })
      : await Room.findAll(); // Sin filtros

    res.json(rooms);
  } catch (err) {
    console.error("Error in getAllRooms:", err);
    res.status(500).json({ message: "Error fetching rooms" });
  }
};

const getRoomById = async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.Id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching room" });
  }
};

const updateRoom = async (req, res) => {
  const room = await Room.findByPk(req.params.Id);
  try {
    if (room == null) {
      res.json({ message: "User not found" });
      error.status = 404;
      throw error;
    } else {
      room.projector =
        req.body.projector !== undefined ? req.body.projector : room.projector;
      room.boxes = req.body.boxes !== undefined ? req.body.boxes : room.boxes;
      room.capacity =
        req.body.capacity !== undefined ? req.body.capacity : room.capacity;

      await room.save();
      res.json(room);
    }
  } catch (err) {
    next(err);
  }
};

const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.Id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    await room.destroy();
    res.json({ message: "Room deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting room" });
  }
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
};
