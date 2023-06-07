const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {

  // defino el modelo
  
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    apodo: {
      type: DataTypes.STRING,
      allowNull: false,
      //agrego
    },

    weight: {
      type: DataTypes.JSON,
      allowNull: false,
    },

    height: {
      type: DataTypes.JSON,
      allowNull: false,
    },

    life_span: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.JSON,
      allowNull: false,
    }

  }, {
    timestamps: false,
  });
};
