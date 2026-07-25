import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const placeOrder = async (req, res) => {
  try {

    const {
      items,
      totalPrice,
      shippingAddress,
      paymentMethod
    } = req.body;


    const userId = req.user.id;



    if (!items || items.length === 0) {

      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });

    }




    const order = await Order.create({

      user: userId,

      items,

      totalPrice,

      shippingAddress,

      paymentMethod,

    });





    await Cart.deleteMany({
      user: userId
    });





    res.status(201).json({

      success: true,

      message: "Order placed successfully",

      order,

    });



  } catch (error) {


    console.log("ORDER ERROR:", error);


    res.status(500).json({

      success: false,

      message: error.message,

    });


  }
};
export const getMyOrders = async (req, res) => {
  try {

    const { userId } = req.params;

    const orders = await Order.find({ user: userId })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("user")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const updateOrderStatus = async (req, res) => {
  try {

    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};