import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaUser,
  FaFileAlt,
  FaPen,
  FaPaperPlane,
} from "react-icons/fa";

export default function Contact() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/complaints",
        formData
      );

      if (response.data.success) {
        setSuccess("Your message has been sent successfully.");

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (err) {
      console.error("CONTACT ERROR:", err);

      setError(
        err.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Address",
      text: (
        <>
          CraftCorner Marketplace
          <br />
          Jaipur, Rajasthan
          <br />
          India
        </>
      ),
    },
    {
      icon: <FaPhoneAlt />,
      title: "Phone",
      text: "+91 98765 43210",
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      text: "support@craftcorner.com",
    },
    {
      icon: <FaClock />,
      title: "Working Hours",
      text: (
        <>
          Monday - Saturday
          <br />
          9:00 AM - 6:00 PM
        </>
      ),
    },
  ];

  return (
    <div
      className="min-h-screen bg-[#F7F5EF]"
      style={{
        transform: "translate(0px, 0px)",
        padding: "0px 30px 60px",
      }}
    >

      {/* BACK TO HOME */}

      <div
        className="max-w-[1600px] mx-auto"
        style={{
          transform: "translate(0px, 0px)",
          padding: "0px 10px 18px",
        }}
      >
        <button
          onClick={() => navigate("/")}
          className="
            text-[#556B2F]
            text-lg
            font-semibold
            hover:text-[#3F5220]
            transition
          "
          style={{
            transform: "translate(-30px, 10px) scale(0.9)",
            padding: "5px 10px",
          }}
        >
          ← Back
        </button>
      </div>


      {/* NAVBAR */}

      <div
        className="
          max-w-[1600px]
         max-h-[100px]
       bg-[#F7F5EF]
        
          
          flex
          items-center
          justify-between
        
        "
       style={{
  transform: "translate(0px, -20px)",
  padding: "10px 38px",
  height: "40px",
}}
      >

        {/* LOGO */}

        <div
          className="flex items-center gap-2"
          style={{
            transform: "translate(0px, 0px)",
            padding: "0px",
          }}
        >
          <span
            className="text-2xl"
            style={{
              transform: "translate(50px, 0px)",
              padding: "0px",
            }}
          >
            🌱
          </span>

          <span
            className="text-xl font-medium text-[#556B2F]"
            style={{
              transform: "translate(50px, 0px)",
              padding: "0px",
            }}
          >
            CraftCorner
          </span>
        </div>


        {/* NAV LINKS */}

        <div
  className="flex items-center gap-12"
  style={{
transform:"translateX(0px) translateY(-3px)",
    padding: "0px",
  }}
>
  <button
    onClick={() => navigate("/")}
    className="text-[#111111] text-[22px] font-medium"
    style={{
transform:"translateX(0px) translateY(-3px)",
      padding: "0px",
      border: "none",
      background: "transparent",
      cursor: "pointer",
    }}
  >
    Home
  </button>

  <button
    onClick={() => navigate("/marketplace")}
    className="text-[#111111] text-[22px] font-medium"
    style={{
transform:"translateX(0px) translateY(-3px)",

      padding: "0px",
      border: "none",
      background: "transparent",
      cursor: "pointer",
    }}
  >
    Marketplace
  </button>

  <button
    onClick={() => navigate("/contact")}
    className="text-[#556B2F] text-[22px] font-bold"
    style={{
transform:"translateX(0px) translateY(-3px)",
      padding: "0px",
      border: "none",
      background: "transparent",
      cursor: "pointer",
    }}
  >
    Contact
  </button>
</div>


        {/* SEARCH */}

        <div
          className="
            hidden
            lg:flex
            items-center
            w-[275px]
            h-[56px]
            rounded-full
            border
            border-[#DDDAD1]
            text-[#99958D]
          "
          style={{
            transform: "translate(0px, 0px)",
            padding: "0px 24px",
          }}
        >
          Search products...
        </div>

      </div>


      {/* PAGE HEADING */}

      <div
        className="text-center"
        style={{
          transform: "translate(0px, -45px)",
          padding: "35px 0px 30px",
        }}
      >

        <div
          className="flex justify-center items-center gap-5"
          style={{
            transform: "translate(0px, 0px)",
            padding: "0px",
          }}
        >

          <span
            className="text-3xl text-[#A8B68A]"
            style={{
              transform: "translate(0px, 0px)",
              padding: "0px",
            }}
          >
            🌿
          </span>

          <h1
            className="text-5xl font-bold text-[#28351F]"
            style={{
              transform: "translate(0px, 0px)",
              padding: "0px",
            }}
          >
            Contact Us
          </h1>

          <span
            className="text-3xl text-[#A8B68A]"
            style={{
              transform: "translate(0px, 0px)",
              padding: "0px",
            }}
          >
            🌿
          </span>

        </div>


        <p
          className="text-lg text-[#706E67]"
          style={{
            transform: "translate(0px, -15px)",
            padding: "12px 0px 0px",
          }}
        >
          Have a question? We are here to help you.
        </p>

      </div>


      {/* MAIN SECTION */}

      <div
        className="
          max-w-[1850px]

          mx-auto
          grid
          grid-cols-1
          lg:grid-cols-[420px_1fr]
          gap-10
        "
        style={{
          transform: "translate(0px, -112px) scale(0.89)",
          padding: "10px 0px",
        }}
      >


        {/* CONTACT INFORMATION CARD */}

        <div
          className="
            bg-white
            rounded-[28px]
            border
            border-[#E5E2D8]
            shadow-[0_8px_25px_rgba(70,80,40,0.08)]
          "
         style={{
  transform: "translate(-70px, 0px)",
  padding: "32px",

  maxWidth: "900px",
}}
        >

          <div
            className="text-center"
            style={{
              transform: "translate(0px, 0px)",
              padding: "0px 0px 25px",
            }}
          >

            <h2
              className="text-3xl font-bold text-[#28351F]"
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px",
              }}
            >
              Get In Touch
            </h2>

            <div
              className="w-14 h-[3px] bg-[#556B2F] mx-auto rounded-full"
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px",
              }}
            />

          </div>


          {/* CONTACT ITEMS */}

          <div
            className="space-y-0"
            style={{
              transform: "translate(0px, 0px)",
              padding: "0px",
            }}
          >

            {contactInfo.map((item, index) => (

              <div
                key={index}
                className="
                  flex
                  gap-5
                  border-b
                  border-[#ECEAE3]
                  last:border-0
                "
                style={{
                  transform: `translate(${index * 2}px, 0px)`,
                  padding: "18px 0px",
                }}
              >

                {/* ICON */}

                <div
                  className="
                    min-w-[58px]
                    h-[58px]
                    rounded-[18px]
                    bg-[#EEF1D8]
                    flex
                    items-center
                    justify-center
                    text-[#657C35]
                    text-xl
                  "
                  style={{
                    transform: "translate(0px, 0px)",
                    padding: "0px",
                  }}
                >
                  {item.icon}
                </div>


                {/* TEXT */}

                <div
                  style={{
                    transform: "translate(0px, 0px)",
                    padding: "0px",
                  }}
                >

                  <h3
                    className="font-bold text-lg text-[#39482B]"
                    style={{
                      transform: "translate(0px, 0px)",
                      padding: "0px 0px 3px",
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="text-[#68675F] text-[16px] leading-7"
                    style={{
                      transform: "translate(0px, 0px)",
                      padding: "0px",
                    }}
                  >
                    {item.text}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* SEND MESSAGE CARD */}

        <div
          className="
            bg-white
            rounded-[28px]
            border
            border-[#E5E2D8]
            shadow-[0_8px_25px_rgba(70,80,40,0.08)]
          "
          style={{
            transform: "translate(0px, 0px)",
            padding: "32px 36px",
          }}
        >

          <div
            className="text-center"
            style={{
              transform: "translate(0px, 0px)",
              padding: "0px 0px 28px",
            }}
          >

            <h2
              className="text-3xl font-bold text-[#28351F]"
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px",
              }}
            >
              Send Message
            </h2>

            <div
              className="w-14 h-[3px] bg-[#556B2F] mx-auto rounded-full"
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px",
              }}
            />

          </div>


          {/* FORM */}

          <form onSubmit={handleSubmit}>


          {/* NAME + EMAIL */}

          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            style={{
              transform: "translate(0px, 0px)",
              padding: "0px",
            }}
          >

            {/* NAME */}

            <div
              className="relative"
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px",
              }}
            >

              <FaUser
                className="
                  absolute
                  left-5
                  top-1/2
                  -translate-y-1/2
                  text-[#7A8D52]
                "
                style={{
                  transform: "translateY(-50%)",
                  padding: "0px",
                }}
              />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="
                  w-full
                  h-[58px]
                  rounded-full
                  border
                  border-[#DCDCCA]
                  bg-white
                  text-[#333]
                  outline-none
                  focus:border-[#657C35]
                  focus:ring-2
                  focus:ring-[#EEF1D8]
                  transition
                "
                style={{
                  transform: "translate(0px, 0px)",
                  padding: "0px 20px 0px 48px",
                }}
              />

            </div>


            {/* EMAIL */}

            <div
              className="relative"
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px",
              }}
            >

              <FaEnvelope
                className="
                  absolute
                  left-5
                  top-1/2
                  -translate-y-1/2
                  text-[#7A8D52]
                "
                style={{
                  transform: "translateY(-50%)",
                  padding: "0px",
                }}
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="
                  w-full
                  h-[58px]
                  rounded-full
                  border
                  border-[#DCDCCA]
                  bg-white
                  text-[#333]
                  outline-none
                  focus:border-[#657C35]
                  focus:ring-2
                  focus:ring-[#EEF1D8]
                  transition
                "
                style={{
                  transform: "translate(0px, 0px)",
                  padding: "0px 20px 0px 48px",
                }}
              />

            </div>

          </div>


          {/* SUBJECT */}

          <div
            className="relative"
            style={{
              transform: "translate(0px, 0px)",
              padding: "20px 0px 0px",
            }}
          >

            <FaFileAlt
              className="
                absolute
                left-5
                top-1/2
                translate-y-2.5
                text-[#7A8D52]
              "
              style={{
                transform: "translateY(-50%)",
                padding: "0px",
              }}
            />

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="
                w-full
                h-[58px]
                rounded-full
                border
                border-[#DCDCCA]
                text-[#333]
                outline-none
                focus:border-[#657C35]
                focus:ring-2
                focus:ring-[#EEF1D8]
                transition
              "
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px 20px 0px 48px",
              }}
            />

          </div>


          {/* MESSAGE */}

          <div
            className="relative"
            style={{
              transform: "translate(0px, 0px)",
              padding: "20px 0px 0px",
            }}
          >

            <FaPen
              className="
                absolute
                left-5
                top-7
                text-[#7A8D52]
 translate-y-3.5

              "
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px",
              }}
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="7"
              placeholder="Write your message..."
              className="
                w-full
                rounded-[25px]
                border
                border-[#DCDCCA]
                text-[#333]
                outline-none
                resize-none
                focus:border-[#657C35]
                focus:ring-2
                focus:ring-[#EEF1D8]
                transition
              "
              style={{
                transform: "translate(0px, 0px)",
                padding: "18px 20px 18px 48px",
              }}
            />

          </div>


          {/* SUCCESS / ERROR */}

          {success && (
            <div
              className="text-[#556B2F] bg-[#EEF1D8] rounded-xl"
              style={{
                padding: "10px 15px",
                marginTop: "15px",
              }}
            >
              {success}
            </div>
          )}

          {error && (
            <div
              className="text-[#B56800] bg-[#FFF0D9] rounded-xl"
              style={{
                padding: "10px 15px",
                marginTop: "15px",
              }}
            >
              {error}
            </div>
          )}


          {/* SEND BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              h-[38px]
              rounded-full
              bg-[#556B2F]
              text-white
              font-bold
              text-lg
              flex
              items-center
              justify-center
              gap-3
              hover:bg-[#465A26]
              hover:scale-[1.01]
              transition
              shadow-md
              disabled:opacity-60
            "
            style={{
              transform: "translate(0px, 0px)",
              padding: "0px 25px",
              marginTop: "22px",
            }}
          >

            <FaPaperPlane
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px",
              }}
            />

            <span
              style={{
                transform: "translate(0px, 0px)",
                padding: "0px",
              }}
            >
              {loading ? "Sending..." : "Send Message"}
            </span>

          </button>

          </form>

        </div>

      </div>

    </div>
  );
}