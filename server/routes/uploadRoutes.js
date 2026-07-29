import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";


const router = express.Router();



const upload = multer({

storage: multer.memoryStorage(),

limits: {

fileSize: 5 * 1024 * 1024

}

});





router.post(

"/",

upload.single("image"),


async(req,res)=>{

console.log("FILE:", req.file);


try{


if(!req.file){

return res.status(400).json({

success:false,

message:"Image file is required"

});

}




const base64Image = 
`data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;




const result = await cloudinary.uploader.upload(

base64Image,

{

folder:"craftcorner/home"

}

);





return res.status(200).json({

success:true,

url:result.secure_url

});




}

catch(error){


console.log("Cloudinary Upload Error:",error);



return res.status(500).json({

success:false,

message:error.message

});


}


}

);




export default router;