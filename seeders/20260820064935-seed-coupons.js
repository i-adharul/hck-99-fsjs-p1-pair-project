'use strict';
const fs = require('fs').promises;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = JSON.parse(await fs.readFile('./coupons.json', 'utf8')).map(obj => {
      delete obj.id
      obj.createdAt = new Date()
      obj.updatedAt = new Date()
      return obj
    })
    await queryInterface.bulkInsert('Coupons', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Coupons', null, {});
  }
};
