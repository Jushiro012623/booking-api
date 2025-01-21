'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Voyages', [
        {
            origin: "San Jose",
            destination: "Semirara",
            type: "out",
            label : "San Jose to Semirara"
          },
          {
            origin: "San Jose",
            destination: "Caluya",
            type: "out",
            label : "San Jose to Caluya"
          },
          {
            origin: "San Jose",
            destination: "Libertad",
            type: "out",
            label : "San Jose to Libertad"
          },
          {
            origin: "Semirara",
            destination: "Caluya",
            type: "out",
            label : "Semirara to Caluya"
          },
          {
            origin: "Semirara",
            destination: "Libertad",
            type: "out",
            label : "Semirara to Libertad"
          },
          {
            origin: "Caluya",
            destination: "Libertad",
            type: "out",
            label : "Caluta to Libertad"
          },
          {
            origin: "Libertad",
            destination: "Caluya",
            type: "in",
            label : "Libertad to Caluya"
          },
          {
            origin: "Libertad",
            destination: "Semirara",
            type: "in",
            label : "Libertad to Semirara"
          },
          {
            origin: "Caluya",
            destination: "Semirara",
            type: "in",
            label : "Caluya to Semirara"
          },
          {
            origin: "Semirara",
            destination: "San Jose",
            type: "in",
            label : "Semirara to San Jose"
          },      
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
