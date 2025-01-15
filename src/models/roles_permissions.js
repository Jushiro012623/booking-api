'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles_Permissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Associations are now handled by belongsToMany in Roles and Permission models
    }
  }
  Roles_Permissions.init({
    role_id: DataTypes.NUMBER,
    permission_id: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Roles_Permissions',
  });
  return Roles_Permissions;
};