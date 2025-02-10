import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('postgres://max:max@localhost:5432/3wa-blog')

export const dbConnect = async () => {
  await sequelize.sync();
  console.log("Database synchronized");
};
