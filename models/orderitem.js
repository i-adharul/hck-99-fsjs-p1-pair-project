'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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