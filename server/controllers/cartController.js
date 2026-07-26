import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const addToCart = async (req, res) => {
  try {

    const { userId, productId, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const existingItem = await Cart.findOne({
      user: userId,
      product: productId,
    });

    if (existingItem) {

      existingItem.quantity += quantity || 1;
      await existingItem.save();

      return res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        cart: existingItem,
      });

    }

    const cart = await Cart.create({
      user: userId,
      product: productId,
      quantity: quantity || 1,
    });

    res.status(201).json({
      success: true,
      message: "Product added to cart",
      cart,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getCart = async (req, res) => {
  try {

    const { userId } = req.params;

    const cart = await Cart.find({ user: userId })
      .populate("product");


    const validCart = cart.filter(
      item => item.product !== null
    );


    res.status(200).json({
      success: true,
      cart: validCart,
    });


  } catch (error) {

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }
};
export const updateCartQuantity = async (req, res) => {
  try {

    const { id } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Cart updated",
      cart,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const removeFromCart = async (req, res) => {
  try {

    const { id } = req.params;

    await Cart.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};