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
        // Define associations here
        // Users_Roles.belongsTo(models.User, { foreignKey: 'user_id' });
        // Users_Roles.belongsTo(models.Roles, { foreignKey: 'role_id' });
    }
  }
  Users_Roles.init({
    user_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users_Roles',
  });
  return Users_Roles;
};