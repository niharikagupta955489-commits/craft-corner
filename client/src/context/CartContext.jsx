import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user, isLoggedIn } = useAuth();

  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (isLoggedIn && user?._id) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [isLoggedIn, user]);

  const fetchCart = async () => {
    try {
      const res = await api.get(`/cart/${user._id}`);
      setCart(res.data.cart);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (product) => {
    if (!isLoggedIn) {
      toast.error("Please login first");
      return;
    }

    try {
      await api.post("/cart", {
        userId: user._id,
        productId: product._id,
        quantity: 1,
      });

      toast.success("Product added to cart");
      fetchCart();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add product"
      );
    }
  };

  const increaseQuantity = async (cartId, quantity) => {
    try {
      await api.put(`/cart/${cartId}`, {
        quantity: quantity + 1,
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQuantity = async (cartId, quantity) => {
    try {
      if (quantity <= 1) {
        removeFromCart(cartId);
        return;
      }

      await api.put(`/cart/${cartId}`, {
        quantity: quantity - 1,
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      await api.delete(`/cart/${cartId}`);

      toast.success("Item removed");

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        fetchCart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}