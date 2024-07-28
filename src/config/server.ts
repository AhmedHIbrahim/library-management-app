import express from "express";
import { sequelize } from "./database";
import userRoutes from "../api/routes/userRoutes";
import bookRoutes from "../api/routes/bookRoutes";
import { errorHandler } from "../api/middleware/errorHandler";

const app = express();

app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/books", bookRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

export const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    await sequelize.sync();
    console.log("All models were synchronized successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start the server:", error);
  }
};
