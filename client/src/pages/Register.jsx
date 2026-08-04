import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../services/authService";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock
} from "react-icons/fa";


export default function Register() {

const inputBox = `
flex
items-center
gap-6
w-[650px]
h-[55px]
mx-auto
border
border-gray-200
rounded-xl
px-5
transition-all
`;

const inputField = `
flex-1
py-4
outline-none
`;

const inputTransform = {
  transform: "translateY(20px) scale(0.9)",
  padding: "0px 30px",
  width: "650px",
  height: "55px",
};
  const navigate = useNavigate();



  const [loading, setLoading] = useState(false);



  const [formData, setFormData] = useState({

    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""

  });





  const handleChange = (e) => {


    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });


  };






  const handleSubmit = async (e) => {


    e.preventDefault();



    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {

      toast.error(
        "Please fill all required fields"
      );

      return;

    }



    if (
      formData.password !== formData.confirmPassword
    ) {

      toast.error(
        "Passwords do not match"
      );

      return;

    }




    try {


      setLoading(true);



      const data = await registerUser({

        name: formData.name,

        email: formData.email,

        phone: formData.phone,

        password: formData.password

      });



      toast.success(data.message);



      navigate("/login");



    }

    catch (error) {


      toast.error(

        error.response?.data?.message ||
        "Registration Failed"

      );


    }

    finally {

      setLoading(false);

    }


  };






  return (
    <div

      className="
min-h-screen
bg-[#FAF7F0]
flex
items-center
justify-center
px-6
py-10
relative
overflow-hidden
"

      style={{

        transform: "translateX(0px) translateY(0px)"

      }}

    >





      <div

        className="
absolute
top-10
left-10
text-[#D7DFC5]
text-8xl
"

      >

        ❧

      </div>




      <div

        className="
absolute
bottom-10
right-10
text-[#D7DFC5]
text-8xl
"

      >

        ❧

      </div>







      <div

        className="
bg-white
w-[650px]
h-[620px]
rounded-[20px]
shadow-xl
p-10
"
        style={{

          transform: "translateX(0px) translateY(0px)"

        }}

      >





        <div

          className="
w-24
h-24
rounded-full
bg-[#EEF3E3]
border
border-[#C8D5A9]
mx-auto
flex
items-center
justify-center
"
          style={{

            transform: "translateX(270px) translateY(10px)scale(0.8)"

          }}
        >

          <FaUser

            size={42}

            className="
text-[#556B2F]
"

          />


        </div>






        <h1

          className="
text-4xl
font-black
text-center
text-[#2F3A2D]
mt-6
"
          style={{

            transform: "translateX(0px) translateY(6px)"

          }}
        >

          Create Account

        </h1>





        <p

          className="
text-center
text-gray-500
mt-3
text-lg
"
style={{

          transform: "translateX(0px) translateY(6px)"

        }}
        >

          Join CraftCorner today

        </p>





        <form

          onSubmit={handleSubmit}

          className="
mt-10
!space-y-2
"

        >

          {/* NAME */}


          <div>

            

            
  <div
  className={inputBox}



             style={inputTransform}

            >


              <FaUser

                className="
text-[#556B2F]
"

              />


              <input

                type="text"

                name="name"

                value={formData.name}

                onChange={handleChange}

                placeholder="Enter your full name"

                className="
w-full
py-4
outline-none
"

              />


            </div>


          </div>








          {/* EMAIL */}


          <div>

            


            <div
  className={inputBox}

style={inputTransform}
            >


              <FaEnvelope

                className="
text-[#556B2F]
"

              />


              <input

                type="email"

                name="email"

                value={formData.email}

                onChange={handleChange}

                placeholder="Enter your email"

                className="
w-full
py-4
outline-none
"

              />


            </div>


          </div>







          {/* PHONE */}


          <div>

           

            <div
  className={inputBox}

style={inputTransform}
            >


              <FaPhone

                className="
text-[#556B2F]
"

              />


              <input

                type="tel"

                name="phone"

                value={formData.phone}

                onChange={handleChange}

                placeholder="Enter your phone number"

                className="
w-full
py-4
outline-none
"

              />


            </div>


          </div>








          {/* PASSWORD */}


          <div>

            


            <div
  className={inputBox}


style={inputTransform}


            >


              <FaLock

                className="
text-[#556B2F]
"

              />


              <input

                type="password"

                name="password"

                value={formData.password}

                onChange={handleChange}

                placeholder="Create password"

                className="
w-full
py-4
outline-none
"

              />


            </div>


          </div>








          {/* CONFIRM PASSWORD */}


          <div>


          <div
  className={inputBox}

style={inputTransform}
            >


              <FaLock

                className="
text-[#556B2F]
"

              />


              <input

                type="password"

                name="confirmPassword"

                value={formData.confirmPassword}

                onChange={handleChange}

                placeholder="Confirm password"

                className="
w-full
py-4
outline-none
"

              />


            </div>


          </div>


          {/* BUTTON */}


          <button

            type="submit"

            disabled={loading}

            className="
w-full
bg-[#556B2F]
text-white
py-4
rounded-2xl
font-bold
text-lg
hover:bg-[#445625]
transition
disabled:opacity-50
"

            style={{

          transform: "translateX(0px) translateY(70px) scale(0.8)"

        }}

          >


            {

              loading

                ?

                "Creating Account..."

                :

                "Create Account"

            }


          </button>






        </form>







        {/* LOGIN LINK */}



        <p

          className="
text-center
mt-8
text-gray-600
"

          style={{

            transform: "translateX(0px) translateY(10px)"

          }}

        >


          Already have an account?


          <Link

            to="/login"

            className="
ml-2
text-[#556B2F]
font-bold
"

          >

            Login

          </Link>



        </p>







      </div>





    </div >


  );

}