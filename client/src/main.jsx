import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import WishlistProvider from "./context/WishlistProvider";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <App />
          <Toaster position="top-right" />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);