'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Flight.init({
    airline: DataTypes.STRING,
    departureTime: DataTypes.DATE,
    arrivalTime: DataTypes.DATE,
    duration: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    availableSeats: DataTypes.INTEGER,
    class: DataTypes.STRING,
    destination: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};