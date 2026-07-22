import dotenv from "dotenv";

dotenv.config({
  path:"./.env"
});
console.log(process.env);

import cloudinary from "./config/cloudinary.js";

import app from "./app.js";
import connectDB from "./config/db.js";


connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});