'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Coupon.belongsTo(models.Category, {
        foreignKey: 'category_id'
      })

      Coupon.belongsToMany(models.Order, {
        through: models.OrderItem,
        foreignKey: 'coupon_id',
        otherKey: 'order_id'
      });

      Coupon.hasMany(models.OrderItem, {
        foreignKey: 'coupon_id'
      })
    }
  }
  Coupon.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    expired_date: DataTypes.DATE,
    image: DataTypes.STRING,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Coupon',
  });
  return Coupon;
};