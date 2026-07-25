
import Product from "../models/Product.js";

// Create Product
export const createProduct = async (req, res) => {
  try {
   const product = await Product.create({

...req.body,

images: req.files ? req.files.map(file => file.path) : []

});

    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      product,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get Single Product
export const getProductById = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Update Product
export const updateProduct = async (req, res) => {

  try {

    console.log("BODY:", req.body);
    console.log("FILES:", req.files);


    const updateData = {
      ...req.body
    };


    if(req.files && req.files.length > 0){

      updateData.images = req.files.map(
        file => file.path
      );

    }


    const product = await Product.findByIdAndUpdate(

      req.params.id,

      updateData,

      {
        new:true
      }

    );


    if(!product){

      return res.status(404).json({

        success:false,

        message:"Product not found"

      });

    }


    res.status(200).json({

      success:true,

      message:"Product Updated Successfully",

      product

    });


  }catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

};


// Delete Product
export const deleteProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// Get Products By Category
export const getProductsByCategory = async (req,res)=>{
  try {

    const category = req.params.category
      .replace("-", " ");

    const products = await Product.find({
      category: {
        $regex: new RegExp(category, "i")
      }
    });


    res.status(200).json({
      success:true,
      count:products.length,
      products
    });


  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};

// Search Products
export const searchProducts = async (req,res)=>{
  try{

    const query = req.query.query;

    const products = await Product.find({

      $or:[
        {
          name:{
            $regex:query,
            $options:"i"
          }
        },
        {
          category:{
            $regex:query,
            $options:"i"
          }
        },
        {
          description:{
            $regex:query,
            $options:"i"
          }
        }
      ]

    });


    res.status(200).json({
      success:true,
      count:products.length,
      products
    });


  }catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};