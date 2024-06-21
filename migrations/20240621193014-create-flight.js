'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      airline: {
        type: Sequelize.STRING
      },
      departureTime: {
        type: Sequelize.DATE
      },
      arrivalTime: {
        type: Sequelize.DATE
      },
      duration: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL
      },
      availableSeats: {
        type: Sequelize.INTEGER
      },
      class: {
        type: Sequelize.STRING
      },
      destination: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Flights');
  }
};