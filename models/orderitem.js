'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
      OrderItem.belongsTo(models.Order, {
        foreignKey: 'order_id'
      })

      OrderItem.belongsTo(models.Coupon, {
        foreignKey: 'coupon_id'
      })
    }
  }
  OrderItem.init({
    order_id: DataTypes.INTEGER,
    coupon_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    item_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderItem',
  });
  return OrderItem;
};