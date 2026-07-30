import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


import adminRoutes from "./routes/adminRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import adminV2Routes from "./routes/adminV2Routes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";



const app = express();



app.use(
  cors({
    origin:true,
    credentials:true
  })
);



app.use(express.json());


app.use(
  express.urlencoded({
    extended:true
  })
);


app.use(cookieParser());




// Routes


app.use(
  "/api/admin",
  adminRoutes
);


app.use(
  "/api/auth",
  authRoutes
);


app.use(
  "/api/products",
  productRoutes
);


app.use(
  "/api/cart",
  cartRoutes
);


app.use(
  "/api/wishlist",
  wishlistRoutes
);


app.use(
  "/api/orders",
  orderRoutes
);


app.use(
  "/api/dashboard",
  dashboardRoutes
);


app.use(
  "/api/categories",
  categoryRoutes
);


app.use(
  "/api/admin-v2",
  adminV2Routes
);


app.use(
  "/api/home",
  homeRoutes
);


app.use(
  "/api/upload",
  uploadRoutes
);




// Test API


app.get(
  "/",
  (req,res)=>{

    res.json({

      success:true,

      message:"CraftCorner Backend Running"

    });

  }

);



export default app;