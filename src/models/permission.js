'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Permission.belongsToMany(models.Roles, {
            through: models.Roles_Permissions,
            foreignKey: 'permission_id',
            otherKey: 'role_id',
            onDelete: 'CASCADE',
        });
    }
  }
  Permission.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Permission',
  });
  return Permission;
};