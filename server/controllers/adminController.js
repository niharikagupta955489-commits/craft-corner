import bcrypt from "bcryptjs";
import User from "../models/User.js";


// Create Admin
export const createAdmin = async (req,res)=>{

try{

const {
name,
email,
password,
phone,
permissions
}=req.body;


const existingAdmin = await User.findOne({email});


if(existingAdmin){

return res.status(400).json({
success:false,
message:"Email already exists"
});

}



const hashedPassword = await bcrypt.hash(password,10);



const admin = await User.create({

name,
email,
password:hashedPassword,
phone,

role:"admin",

permissions

});



res.status(201).json({

success:true,
message:"Admin Created Successfully",
admin

});


}catch(error){

res.status(500).json({

success:false,
message:error.message

});

}

};





// Get All Admins
export const getAdmins = async(req,res)=>{

try{


const admins = await User.find(
{
role:"admin"
},
"-password"
);



res.status(200).json({

success:true,
admins

});


}catch(error){


res.status(500).json({

success:false,
message:error.message

});


}

};





// Update Admin
export const updateAdmin = async(req,res)=>{


try{


const admin = await User.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true
}

);



res.status(200).json({

success:true,
message:"Admin Updated",
admin

});


}catch(error){


res.status(500).json({

success:false,
message:error.message

});


}

};






// Delete Admin
export const deleteAdmin = async(req,res)=>{


try{


await User.findByIdAndDelete(req.params.id);



res.status(200).json({

success:true,
message:"Admin Deleted"

});


}catch(error){


res.status(500).json({

success:false,
message:error.message

});


}

};