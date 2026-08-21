'use strict';
const {
  Model
} = require('sequelize');
const { Op } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {
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

    get inputExpiredDate() {
      return new Date(this.expired_date).toISOString().split('T')[0]
    }

    static async getCouponsByCategory(search, category) {
      let option = {
        include: "Category",
        where: {}
      }

      if (search || category) {
        option.where = {
          [Op.or]: [
            {
              title: {
                [Op.iLike]: `%${search}%`
              }
            },
            {
              description: {
                [Op.iLike]: `%${search}%`
              }
            },
            {
              category_id: {
                [Op.eq]: category
              }
            }
          ]
        }
      }

      return await Coupon.findAll(option)
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