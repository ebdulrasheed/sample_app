/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    token_no: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_deleted: {
      type: "BINARY(1)",
      allowNull: false
    },
    address_book_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      references: {
        model: 'address_book',
        key: 'id'
      }
    }
  }, {
    tableName: 'user'
  });
};
