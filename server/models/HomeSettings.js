import mongoose from "mongoose";


const homeSettingsSchema = new mongoose.Schema({

bannerImage:{
    type:String,
    required:true
},


categories:[

{
    name:{
        type:String,
        required:true
    },

    image:{
        type:String,
        required:true
    },

    path:{
        type:String
    }

}

]

},
{
timestamps:true
}
);



const HomeSettings = mongoose.model(
"HomeSettings",
homeSettingsSchema
);



export default HomeSettings;