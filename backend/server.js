<<<<<<< HEAD
import "dotenv/config";
import express from "express";
import cors from "cors";
=======
import express from "express";
import cors from "cors";
import "dotenv/config";
>>>>>>> refactor/error-handling
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
<<<<<<< HEAD

// app config
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
=======
import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

connectDB();

>>>>>>> refactor/error-handling
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API working");
});

<<<<<<< HEAD
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
=======
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
>>>>>>> refactor/error-handling
});
