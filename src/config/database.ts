import { Sequelize } from "sequelize";
import User from "../models/User";
import Book from "../models/Book";
import Borrow from "../models/Borrow";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

// Initialize models
User.initialize(sequelize);
Book.initialize(sequelize);
Borrow.initialize(sequelize);

// Set up associations
User.associate();
Book.associate();
Borrow.associate();

export { sequelize };
export const models = { User, Book, Borrow };
