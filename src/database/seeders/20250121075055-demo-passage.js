'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Passages', [
        {
            name: 'san_jose',
            label: 'San Jose'
        },
        {
            name: 'semirara',
            label: 'San Jose'
        },
        {
            name: 'caluya',
            label: 'San Jose'
        },
        {
            name: 'libertad',
            label: 'San Jose'
        }
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
