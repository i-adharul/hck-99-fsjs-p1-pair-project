'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')

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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: " Email is required"
        },
        notEmpty: {
          msg: " Email is required"
        }
      }
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: " Password is required"
        },
        notEmpty: {
          msg: " Password is required"
        },
        len: {
          args: [6, 255],
          msg: " Password must be at least 6 characters"
        },
        is: {
          args: /^(?=.*[a-zA-Z])(?=.*\d)/,
          msg: " Password must contain a combination of letters and numbers"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async (user, options) => {
    // const hashedPassword = await hashPassword(user.password);
    // user.password = hashedPassword;
    const salt = bcrypt.genSaltSync(8)
    const hash = bcrypt.hashSync(user.password_hash, salt)

    user.role = "user"
    user.password_hash = hash
  });
  return User;
};