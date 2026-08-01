import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";


const storage = new CloudinaryStorage({

  cloudinary: cloudinary,

  params: {

  folder:"craftcorner/profile",

  allowed_formats:[
    "jpg",
    "jpeg",
    "png",
    "webp"
  ],

  transformation:[
    {
      width:500,
      height:500,
      crop:"fill",
      gravity:"face"
    }
  ]

}

});


const profileUpload = multer({

  storage

});


export default profileUpload;