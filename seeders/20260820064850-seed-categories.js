'use strict';
const fs = require('fs').promises;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = JSON.parse(await fs.readFile('./categories.json', 'utf8')).map(obj => {
      delete obj.id
      obj.createdAt = new Date()
      obj.updatedAt = new Date()
      return obj
    })
    await queryInterface.bulkInsert('Categories', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
