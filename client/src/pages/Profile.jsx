import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
} from "react-icons/fa";


export default function Profile() {

const navigate = useNavigate();
  const [user,setUser] = useState({

    name:"",
    email:"",
    phone:"",
    address:"",
    password:""

  });


  const [loading,setLoading] = useState(false);



  useEffect(()=>{

    getProfile();

  },[]);





  const getProfile = async()=>{

    try{

      const res = await api.get("/auth/profile");


      setUser({

        name:res.data.user.name || "",

        email:res.data.user.email || "",

        phone:res.data.user.phone || "",

        address:res.data.user.address || "",

        password:""

      });


    }catch(error){

      console.log(error);

    }

  };





  const handleChange=(e)=>{

    setUser({

      ...user,

      [e.target.name]:e.target.value

    });

  };





  const updateProfile = async()=>{


    try{


      setLoading(true);


      await api.put(

        "/auth/profile",

        user

      );


      alert(
        "Profile Updated Successfully"
      );


      setUser({

        ...user,

        password:""

      });



    }catch(error){


      console.log(error);


      alert(
        "Update Failed"
      );


    }
    finally{

      setLoading(false);

    }


  };





  return (

    <div

      className="
      min-h-screen
      bg-[#FAF5EC]
      py-12
      "

      style={{
        transform:"translate(350px,200px) scale(1.42)"
      }}

    >



      <div

        className="
        max-w-5xl
        mx-auto
        px-6
        "

        style={{
          transform:"translate(0px,10px)"
        }}

      >



<button

onClick={() => navigate("/")}

className="
mb-6
flex
items-center
gap-2
rounded-xl
bg-[#FFF4E5]
px-5
py-3
font-semibold
text-[#C47A1C]
border
border-[#F2D3A0]
hover:bg-[#FCE7C7]
transition
"

style={{
paddingLeft:"20px",
 paddingRight:"20px",
  transform:"translate(-30px,-30px) scale(0.7)"
}}

>

← Back To Home

</button>


        <h1

          className="
          text-4xl
          font-black
          text-[#3D3023]
          mb-10
          "

          style={{
            transform:"translate(-130px,-30px) scale(0.7)"
          }}

        >

          My Profile

        </h1>




        <div

          className="
          bg-white
          rounded-[35px]
          shadow-xl
          border
          border-[#E8DDCC]
          p-10
          "

          style={{
            transform:"translate(0px,0px)"
          }}

        >



          <div

            className="
            flex
            flex-col
            md:flex-row
            items-center
            gap-8
            mb-10
            "

            style={{
              transform:"translate(0px,-5px)"
            }}

          >



            <div

              className="
              h-36
              w-36
              rounded-full
              bg-[#F4E3C2]
              flex
              items-center
              justify-center
              text-5xl
              font-bold
              text-[#C47A1C]
              border-4
              border-[#C47A1C]
              "

              style={{
                transform:"translate(20px,0px) scale(0.3)"
              }}

            >

              <FaUser/>

            </div>




            <div

              style={{
                transform:"translate(-70px,-1px) scale(0.7)"
              }}

            >

              <h2

                className="
                text-3xl
                font-bold
                text-[#3D3023]
                "

              >

                {user.name || "User"}

              </h2>



              <p

                className="
                text-[#7A6B59]
                mt-2
                "

              >

                {user.email}

              </p>


            </div>


          </div>

        <div

          className="
          grid
          md:grid-cols-2
          gap-6
          "

          style={{
paddingLeft:"20px",
 paddingRight:"20px",
            transform:"translate(0px,10px)"
          }}

        >




          <div

            style={{
paddingLeft:"20px",
 paddingRight:"20px",
              transform:"translate(-5px,0px)"
            }}

          >

            <label

              className="
              text-sm
              font-semibold
              text-[#3D3023]
              "

            >

              Name

            </label>



            <div

              className="
              flex
              items-center
              gap-3
              border
              rounded-2xl
              px-4
              mt-2
              "

              style={{
paddingLeft:"20px",
 paddingRight:"20px",
                transform:"translate(0px,5px)"
              }}

            >

              <FaUser className="text-[#C47A1C]" />


              <input

                name="name"

                value={user.name}

                onChange={handleChange}

                className="
                w-full
                py-3
                outline-none
                "

              />


            </div>


          </div>







          <div

            style={{
paddingLeft:"20px",
 paddingRight:"20px",
              transform:"translate(5px,0px)"
            }}

          >

            <label

              className="
              text-sm
              font-semibold
              text-[#3D3023]
              "

            >

              Email

            </label>



            <div

              className="
              flex
              items-center
              gap-3
              border
              rounded-2xl
              px-4
              mt-2
              "

              style={{
paddingLeft:"20px",
 paddingRight:"20px",
                transform:"translate(0px,5px)"
              }}

            >

              <FaEnvelope className="text-[#C47A1C]" />


              <input

                name="email"

                value={user.email}

                onChange={handleChange}

                className="
                w-full
                py-3
                outline-none
                "

              />


            </div>


          </div>








          <div

            style={{
paddingLeft:"20px",
 paddingRight:"20px",
              transform:"translate(-5px,5px)"
            }}

          >

            <label

              className="
              text-sm
              font-semibold
              text-[#3D3023]
              "

            >

              Phone

            </label>



            <div

              className="
              flex
              items-center
              gap-3
              border
              rounded-2xl
              px-4
              mt-2
              "

              style={{
paddingLeft:"20px",
 paddingRight:"20px",
                transform:"translate(0px,5px)"
              }}

            >

              <FaPhone className="text-[#C47A1C]" />


              <input

                name="phone"

                value={user.phone}

                onChange={handleChange}

                className="
                w-full
                py-3
                outline-none
                "

              />


            </div>


          </div>








          <div

            style={{
paddingLeft:"20px",
 paddingRight:"20px",
              transform:"translate(5px,5px)"
            }}

          >

            <label

              className="
              text-sm
              font-semibold
              text-[#3D3023]
              "

            >

              New Password

            </label>



            <div

              className="
              flex
              items-center
              gap-3
              border
              rounded-2xl
              px-4
              mt-2
              "

              style={{
paddingLeft:"20px",
 paddingRight:"20px",
                transform:"translate(0px,5px)"
              }}

            >

              <FaLock className="text-[#C47A1C]" />


              <input

                type="password"

                name="password"

                value={user.password}

                onChange={handleChange}

                placeholder="Change password"

                className="
                w-full
                py-3
                outline-none
                "

              />


            </div>


          </div>


        </div>





        <div

          className="mt-8"

          style={{
            transform:"translate(0px,20px)"
          }}

        >

          <label

            className="
            text-sm
            font-semibold
            text-[#3D3023]

            "

          >

             ..... .....  Address

          </label>



          <textarea

            name="address"

            value={user.address}

            onChange={handleChange}

            rows="4"

            className="
            mt-2
            w-full
            border
            rounded-2xl
            px-5
            py-4
            outline-none
            "

            style={{
paddingLeft:"20px",
 paddingRight:"20px",
              transform:"translate(0px,4px) scale(0.95)"
            }}

          />


        </div>

        <button

          onClick={updateProfile}

          disabled={loading}

          className="
          mt-8
          bg-gradient-to-r
          from-[#C47A1C]
          to-[#E0A44B]
          text-white
          px-10
          py-4
          rounded-2xl
          font-bold
          hover:scale-105
          transition
          "

          style={{
paddingLeft:"20px",
 paddingRight:"20px",
            transform:"translate(20px,40px)"
          }}

        >

          {loading ? "Saving..." : "Save Changes"}

        </button>



      </div>



    </div>
   </div>


  );

}