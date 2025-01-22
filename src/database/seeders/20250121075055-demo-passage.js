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
            label: 'Semirara'
        },
        {
            name: 'caluya',
            label: 'Caluya'
        },
        {
            name: 'libertad',
            label: 'Libertad'
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
