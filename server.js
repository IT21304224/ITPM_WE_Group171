import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productRoutes.js";
import exchangeRoutes from "./routes/exchangeRoute.js";
import feedbackRoutes from "./routes/feedbackRoute.js";
import cors from "cors";

//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/exchange", exchangeRoutes);
app.use("/api/v1/feedback", feedbackRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Fashion Elegance</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
