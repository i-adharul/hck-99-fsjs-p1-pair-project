'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Profile, {
        foreignKey: 'user_id'
      })

      User.hasMany(models.Order, {
        foreignKey: 'user_id'
      })
    }
  }
  User.init({
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async (user, options) => {
    // const hashedPassword = await hashPassword(user.password);
    // user.password = hashedPassword;
    user.role = "user"
  });
  return User;
};