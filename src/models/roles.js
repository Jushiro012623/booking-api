'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Roles.belongsToMany(models.Permission, {
            through: models.Roles_Permissions,
            foreignKey: 'role_id',
            otherKey: 'permission_id',
            onDelete: 'CASCADE',
        });
          
        Roles.belongsToMany(models.User, {
            through: models.Users_Roles,
            foreignKey: 'role_id',
            otherKey: 'user_id',
            onDelete: 'CASCADE',
        });

    }
  }
  Roles.init({
    name: DataTypes.STRING,
    label: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Roles',
  });
  return Roles;
};