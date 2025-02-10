import { DataTypes } from "sequelize";
import { sequelize } from "../../database";

export const UserModel = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isContributor: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  }
})