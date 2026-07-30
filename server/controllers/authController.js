import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


// REGISTER

export const register = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      phone
    } = req.body;


    if (!name || !email || !password) {

      return res.status(400).json({
        success:false,
        message:"Please fill all required fields"
      });

    }


    const existUser = await User.findOne({
      email
    });


    if (existUser) {

      return res.status(400).json({
        success:false,
        message:"User already exists"
      });

    }


    const hashedPassword = await bcrypt.hash(
      password,
      10
    );


    const user = await User.create({

      name,

      email,

      password:hashedPassword,

      phone

    });


    res.status(201).json({

      success:true,

      message:"Registration Successful",

      user

    });


  } catch(error) {


    res.status(500).json({

      success:false,

      message:error.message

    });


  }

};





// LOGIN

export const login = async(req,res)=>{

  try{


    const {
      email,
      password
    } = req.body;



    const user = await User.findOne({
      email
    });



    if(!user){

      return res.status(404).json({

        success:false,

        message:"User not found"

      });

    }



    const match = await bcrypt.compare(

      password,

      user.password

    );



    if(!match){

      return res.status(401).json({

        success:false,

        message:"Invalid password"

      });

    }



    const token = jwt.sign(

      {

        id:user._id,

        role:user.role

      },

      process.env.JWT_SECRET,

      {

        expiresIn:"7d"

      }

    );



    res.json({

      success:true,

      token,


      user:{

        id:user._id,

        _id:user._id,

        name:user.name,

        email:user.email,

        phone:user.phone,

        address:user.address,

        avatar:user.avatar,

        role:user.role

      }

    });



  }catch(error){


    res.status(500).json({

      success:false,

      message:error.message

    });


  }

};







// GET ALL USERS

export const getAllUsers = async(req,res)=>{

  try{


    const users = await User.find()
    .select("-password");


    res.json({

      success:true,

      users

    });



  }catch(error){


    res.status(500).json({

      success:false,

      message:error.message

    });


  }

};







// DELETE USER

export const deleteUser = async(req,res)=>{

  try{


    const user = await User.findById(
      req.params.id
    );


    if(!user){

      return res.status(404).json({

        success:false,

        message:"User not found"

      });

    }



    await user.deleteOne();



    res.json({

      success:true,

      message:"User deleted successfully"

    });



  }catch(error){


    res.status(500).json({

      success:false,

      message:error.message

    });


  }

};








// GET PROFILE

export const getProfile = async(req,res)=>{

  try{


    const user = await User.findById(

      req.user.id

    ).select("-password");



    if(!user){

      return res.status(404).json({

        success:false,

        message:"User not found"

      });

    }



    res.json({

      success:true,

      user

    });



  }catch(error){


    res.status(500).json({

      success:false,

      message:error.message

    });


  }

};









// UPDATE PROFILE

export const updateProfile = async(req,res)=>{

  try{


    const user = await User.findById(

      req.user.id

    );



    if(!user){

      return res.status(404).json({

        success:false,

        message:"User not found"

      });

    }




    user.name =
      req.body.name || user.name;



    user.email =
      req.body.email || user.email;



    user.phone =
      req.body.phone || user.phone;



    user.address =
      req.body.address || user.address;





    if(req.body.password){

      user.password = await bcrypt.hash(

        req.body.password,

        10

      );

    }




    await user.save();



    res.json({

      success:true,

      message:"Profile Updated Successfully",

      user:{
        name:user.name,
        email:user.email,
        phone:user.phone,
        address:user.address
      }

    });



  }catch(error){


    res.status(500).json({

      success:false,

      message:error.message

    });


  }

};