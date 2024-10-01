import express from "express";
import connectDB from "./database/db.js";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
dotenv.config();
import authRouter from "./routes/auth.js";
import categoryRoutes from "./routes/categoryRoute.js"
import productRoute from "./routes/productRoute.js"
import path from 'path';
import { fileURLToPath } from 'url';

const port = process.env.PORT || 3000;

// Connect to the database
connectDB();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle any requests that don't match an API route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Middleware
app.use(cors());
app.use(morgan());
app.use(express.json());

//routes
app.use("/auth", authRouter);
app.use("/category", categoryRoutes)
app.use("/product", productRoute)
//rest api
app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

// Error handling
app.use((err, req, res, next) => {
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
});
