import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";


const WishlistContext = createContext();


export const useWishlist = () => useContext(WishlistContext);



export default function WishlistProvider({ children }) {


  const [wishlist, setWishlist] = useState([]);



  useEffect(()=>{

    fetchWishlist();

  },[]);




  const fetchWishlist = async()=>{

    try{

      const res = await api.get("/wishlist");

      setWishlist(
        res.data.wishlist || []
      );


    }
    catch(error){

      console.log(
        "Wishlist fetch error",
        error
      );

    }

  };





  const addToWishlist = async(product)=>{


    try{


      await api.post(
        `/wishlist/${product._id}`
      );


      setWishlist((prev)=>[
        ...prev,
        product
      ]);



    }
    catch(error){

      console.log(
        "Add wishlist error",
        error
      );

    }


  };






  const removeFromWishlist = async(id)=>{


    try{


      await api.delete(
        `/wishlist/${id}`
      );


      setWishlist((prev)=>
        prev.filter(
          item=>item._id !== id
        )
      );


    }
    catch(error){

      console.log(
        "Remove wishlist error",
        error
      );

    }


  };






  const isWishlisted = (id)=>{


    return wishlist.some(
      item=>item._id === id
    );


  };






  return (

    <WishlistContext.Provider

      value={{

        wishlist,

        addToWishlist,

        removeFromWishlist,

        isWishlisted

      }}

    >

      {children}

    </WishlistContext.Provider>

  );


}