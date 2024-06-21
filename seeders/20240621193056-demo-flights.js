'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Flights', [
      {
        airline: 'Garuda Indonesia',
        departureTime: new Date('2024-07-01T08:00:00Z'),
        arrivalTime: new Date('2024-07-01T12:00:00Z'),
        duration: '4 hours',
        price: 250.00,
        availableSeats: 150,
        class: 'Economy',
        destination: 'Jakarta',
        status: 'scheduled',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        airline: 'Singapore Airlines',
        departureTime: new Date('2024-07-02T09:00:00Z'),
        arrivalTime: new Date('2024-07-02T13:00:00Z'),
        duration: '4 hours',
        price: 300.00,
        availableSeats: 120,
        class: 'Business',
        destination: 'Singapore',
        status: 'scheduled',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Flights', null, {});
  }
};
