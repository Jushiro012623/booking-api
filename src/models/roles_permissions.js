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
        // Roles_Permissions.belongsTo(models.Roles, { foreignKey: 'role_id' });
        // Roles_Permissions.belongsTo(models.Permission, { foreignKey: 'permission_id' });
    }
  }
  Roles_Permissions.init({
    role_id: DataTypes.INTEGER,
    permission_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Roles_Permissions',
  });
  return Roles_Permissions;
};