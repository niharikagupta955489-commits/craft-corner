import Category from "../models/Category.js";


// Get Categories
export const getCategories = async (req,res)=>{
  try{

    const categories = await Category.find()
      .sort({createdAt:-1});


    res.status(200).json({
      success:true,
      categories
    });


  }catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};



// Add Category
export const createCategory = async(req,res)=>{
  try{

    const category = await Category.create({
      name:req.body.name
    });


    res.status(201).json({
      success:true,
      message:"Category Added",
      category
    });


  }catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};



// Delete Category
export const deleteCategory = async(req,res)=>{
  try{

    await Category.findByIdAndDelete(req.params.id);


    res.status(200).json({
      success:true,
      message:"Category Deleted"
    });


  }catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};