import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";

export default function Contact() {

  const navigate = useNavigate();

  return (

    <div
      className="min-h-screen bg-[#FAF5EC] py-16"
      style={{
        transform:"translate(120px,80px)"
      }}
    >

      <div
        className="max-w-6xl mx-auto px-6"
        style={{
          transform:"translate(10px,10px)"
        }}
      >

        <div
          className="text-center mb-14"
          style={{
            transform:"translate(0px,-10px)"
          }}
        >

          <h1
            className="text-5xl font-black text-[#3D3023]"
            style={{
              transform:"translate(0px,-50px)"
            }}
          >
            Contact Us
          </h1>


          <p
            className="mt-4 text-[#7A6B59] text-lg"
            style={{
              transform:"translate(0px,-50px)"
            }}
          >
            Have a question? We are here to help you.
          </p>

        </div>


        <div
          className="mb-8"
          style={{
            transform:"translate(-100px,-80px)"
          }}
        >

          <button
            onClick={() => navigate("/")}
            className="
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
          >
            ← Back To Home
          </button>

        </div>


        <div
          className="grid lg:grid-cols-5 gap-10"
          style={{
            transform:"translate(50px,30px) scale(1.2)"
          }}
        >


          {/* Contact Info */}

          <div
            className="lg:col-span-2 space-y-6"
            style={{
              transform:"translate(-20px,0px)"
            }}
          >

            <div
              className="bg-white rounded-[30px] p-8 shadow-lg border border-[#E8DDCC]"
            >

              <h2
                className="text-3xl font-bold text-[#3D3023] mb-8"
                style={{
                  transform:"translate(25px,0px) scale(0.8)"
                }}
              >
                Get In Touch
              </h2>


              <div
                className="space-y-7"
                style={{
                  transform:"translate(15px,5px) scale(0.92)"
                }}
              >

                {[
                  {
                    icon:<FaMapMarkerAlt/>,
                    title:"Address",
                    text:
                    <>
                    CraftCorner Marketplace
                    <br/>
                    Jaipur, Rajasthan
                    <br/>
                    India
                    </>
                  },

                  {
                    icon:<FaPhoneAlt/>,
                    title:"Phone",
                    text:"+91 98765 43210"
                  },

                  {
                    icon:<FaEnvelope/>,
                    title:"Email",
                    text:"support@craftcorner.com"
                  },

                  {
                    icon:<FaClock/>,
                    title:"Working Hours",
                    text:
                    <>
                    Monday - Saturday
                    <br/>
                    9:00 AM - 6:00 PM
                    </>
                  }

                ].map((item,index)=>(


                  <div
                    key={index}
                    className="flex gap-5"
                    style={{
                      transform:`translate(${index * 3}px,0px)`
                    }}
                  >

                    <div
                      className="
                      h-12
                      w-12
                      rounded-2xl
                      bg-[#F4E3C2]
                      flex
                      items-center
                      justify-center
                      text-[#C47A1C]
                      "
                      style={{
                        transform:"translate(0px,5px)"
                      }}
                    >
                      {item.icon}
                    </div>


                    <div
                      style={{
                        transform:"translate(10px,0px)"
                      }}
                    >

                      <h3 className="font-bold text-[#3D3023]">
                        {item.title}
                      </h3>

                      <p className="text-[#7A6B59]">
                        {item.text}
                      </p>

                    </div>


                  </div>


                ))}


              </div>


            </div>


          </div>



          {/* Form */}


          <div
            className="lg:col-span-3"
            style={{
              transform:"translate(0px,0px)"
            }}
          >

            <div
              className="
              bg-white
              rounded-[35px]
              p-10
              shadow-xl
              border
              border-[#E8DDCC]
              "
            >

              <h2
                className="text-3xl font-bold text-[#3D3023] mb-8"
                style={{
                  transform:"translate(10px,0px) scale(0.7)"
                }}
              >
                Send Message
              </h2>


              <div className="grid md:grid-cols-2 gap-6">

                <input
                  placeholder="Full Name"
                  style={{
                    transform:"translate(10px,0px)"
                  }}
                  className="
                  rounded-2xl
                  border
                  border-[#E5D8C4]
                  px-5
                  py-4
                  outline-none
                  focus:border-[#C47A1C]
                  "
                />


                <input
                  placeholder="Email Address"
                  style={{
                    transform:"translate(-10px,0px)"
                  }}
                  className="
                  rounded-2xl
                  border
                  border-[#E5D8C4]
                  px-5
                  py-4
                  outline-none
                  focus:border-[#C47A1C]
                  "
                />

              </div>

                <input
                  placeholder="Subject"
                  style={{
                    paddingLeft:"20px",
                    paddingRight:"20px",
                    transform:"translate(0px,5px) scale(0.97)"
                  }}
                  className="
                  mt-6
                  w-full
                  rounded-2xl
                  border
                  border-[#E5D8C4]
                  px-5
                  py-4
                  outline-none
                  focus:border-[#C47A1C]
                  "
                />


                <textarea
                  rows="6"
                  placeholder="Write your message..."
                  style={{
                    paddingLeft:"20px",
                    paddingRight:"20px",
                    transform:"translate(0px,10px) scale(0.97)"
                  }}
                  className="
                  mt-5
                  w-full
                  rounded-2xl
                  border
                  border-[#E5D8C4]
                  px-5
                  py-3
                  outline-none
                  focus:border-[#C47A1C]
                  "
                />


                <button
                  style={{
                    transform:"translate(0px,10px) scale(0.85)"
                  }}
                  className="
                  mt-6
                  w-full
                  rounded-2xl
                  bg-gradient-to-r
                  from-[#C47A1C]
                  to-[#E0A44B]
                  py-4
                  text-white
                  font-bold
                  text-lg
                  hover:scale-[1.02]
                  transition
                  "
                >
                  Send Message
                </button>


              </div>


            </div>


          </div>


        </div>


      </div>


    


  );

}