/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('address_book', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    count: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'address_book'
  });
};
