import { getData } from "../config/connection.config.js";
import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt';

const login = getData.sequelizeClient.define('login',{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pass : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    },
    {
        tableName: 'login',
        freezeTableName: true,
        hooks: {
         beforeCreate: (user, options) => {
             user.pass = user.pass && user.pass != "" ? bcrypt.hashSync(user.pass, 10): "";    
         }
        }
    });

    export const getLogin = login;