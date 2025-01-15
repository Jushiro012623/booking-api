'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users_Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Associations are now handled by belongsToMany in User and Roles models
    }
  }
  Users_Roles.init({
    user_id: DataTypes.NUMBER,
    role_id: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Users_Roles',
  });
  return Users_Roles;
};