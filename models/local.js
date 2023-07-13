import { getData } from "../config/connection.config.js";
import { DataTypes } from "sequelize";

const local = getData.sequelizeClient.define('local',{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true

    },
    namelocal:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genero:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    menu:{
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    tableName: 'local',
});

export const getLocal = local;