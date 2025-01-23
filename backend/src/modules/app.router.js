import connectDB from "../../DB/connection.js";
import authRouter from "./auth/auth.router.js";
import userRouter from "./user/user.router.js";
import booksRouter from "./book/book.router.js";
import cors from "cors";
import { globalErrorHandler } from "../middleware/errorHandling.js";

const initApp = (app, express) => {

  app.use(cors());
  app.use(express.json());

  // Connect to MongoDB database.
  connectDB();

  // Define global middleware here
  app.get("/", (req, res) => {
    return res.status(200).json("Welcome...");
  });
  // Define routes here
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/books", booksRouter);

  // Error handling middleware
  app.get("*", (req, res) => {
    return res.status(404).json({ message: "Page not found" });
  });
  app.use(globalErrorHandler);
};

export default initApp;