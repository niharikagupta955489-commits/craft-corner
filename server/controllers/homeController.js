import HomeSettings from "../models/HomeSettings.js";


export const getHomeSettings = async(req,res)=>{

try{

const data = await HomeSettings.findOne();

res.json(data);

}
catch(error){

res.status(500).json({
message:error.message
});

}

};



export const updateHomeSettings = async(req,res)=>{

try{


const updated = await HomeSettings.findOneAndUpdate(

{},

req.body,

{
new:true,
upsert:true
}

);


res.json(updated);


}
catch(error){

res.status(500).json({
message:error.message
});

}

};