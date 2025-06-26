const { Model, DataTypes } = require("sequelize");
class Room extends Model {
  static initModel(sequelize) {
    Room.init(
      {
        Id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        projector: {
          type: DataTypes.SMALLINT(1),
          allowNull: false,
        },
        boxes: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        capacity: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 0, // Default value for room capacity
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: "room",
      }
    );
  }
}

module.exports = Room;
