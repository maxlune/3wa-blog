import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('postgres://${DB_USER_NAME}:${DB_USER_PASSWORD}@localhost:5432/${DB_NAME')

export const dbConnect = async () => {
  await sequelize.sync();
  console.log("Database synchronized");
};
