import Wishlist from "../models/wishlistModel.js";



// GET WISHLIST

export const getWishlist = async(req,res)=>{

    try{

        const wishlist = await Wishlist.findOne({
            user:req.user.id
        })
        .populate("products");


        res.json({

            success:true,

            wishlist:wishlist?.products || []

        });


    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};




// ADD PRODUCT

export const addWishlist = async(req,res)=>{


    try{


        let wishlist = await Wishlist.findOne({

            user:req.user.id

        });



        if(!wishlist){

            wishlist = await Wishlist.create({

                user:req.user.id,

                products:[req.params.id]

            });


        }

        else{


            if(!wishlist.products.includes(req.params.id)){

                wishlist.products.push(
                    req.params.id
                );

                await wishlist.save();

            }


        }


        res.json({

            success:true,

            message:"Added to wishlist"

        });


    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }


};




// REMOVE PRODUCT

export const removeWishlist = async(req,res)=>{


    try{


        const wishlist = await Wishlist.findOne({

            user:req.user.id

        });



        wishlist.products =
        wishlist.products.filter(

            id=>id.toString() !== req.params.id

        );



        await wishlist.save();



        res.json({

            success:true,

            message:"Removed"

        });



    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }


};