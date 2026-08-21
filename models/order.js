'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.hasMany(models.Payment, {
        foreignKey: 'order_id'
      })

      Order.belongsTo(models.User, {
        foreignKey: 'user_id'
      })

      Order.belongsToMany(models.Coupon, {
        through: models.OrderItem,
        foreignKey: 'order_id',
        otherKey: 'coupon_id'
      });

      Order.hasMany(models.OrderItem, {
        foreignKey: 'order_id'
      })
    }
  }
  Order.init({
    user_id: DataTypes.INTEGER,
    order_date: DataTypes.DATE,
    total_price: DataTypes.INTEGER,
    order_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};