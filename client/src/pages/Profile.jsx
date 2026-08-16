import { 
  useEffect, 
  useState, 
  useCallback 
} from "react";

import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Cropper from "react-easy-crop";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaMapMarkerAlt
} from "react-icons/fa";



export default function Profile(){


const navigate = useNavigate();



const [user,setUser] = useState({

  name:"",
  email:"",
  phone:"",
  address:"",
  password:"",
  confirmPassword:"",
  avatar:""

});



const [imageSrc,setImageSrc] = useState(null);


const [crop,setCrop] = useState({

  x:0,
  y:0

});


const [zoom,setZoom] = useState(1);


const [croppedAreaPixels,setCroppedAreaPixels] = useState(null);


const [showCrop,setShowCrop] = useState(false);



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

  password:"",

  confirmPassword:"",

  avatar:res.data.user.avatar || ""

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









const handleImageUpload=(e)=>{


const file = e.target.files[0];


if(!file) return;



const reader = new FileReader();



reader.onload = ()=>{


setImageSrc(reader.result);


setShowCrop(true);


};



reader.readAsDataURL(file);


};









const onCropComplete = useCallback(

(croppedArea,croppedAreaPixels)=>{


setCroppedAreaPixels(croppedAreaPixels);


},

[]
);









const uploadCroppedImage = async()=>{


try{


const canvas = document.createElement("canvas");


const image = new Image();


image.src = imageSrc;



image.onload = async()=>{



const canvasSize = 500;



canvas.width = canvasSize;

canvas.height = canvasSize;



const ctx = canvas.getContext("2d");



ctx.drawImage(

image,

croppedAreaPixels.x,

croppedAreaPixels.y,

croppedAreaPixels.width,

croppedAreaPixels.height,

0,

0,

canvasSize,

canvasSize

);




canvas.toBlob(async(blob)=>{


const formData = new FormData();


formData.append(

"avatar",

blob,

"profile.jpg"

);





const res = await api.put(

"/auth/profile/photo",

formData,

{

headers:{

"Content-Type":"multipart/form-data"

}

}

);





setUser({

...user,

avatar:res.data.avatar

});



setShowCrop(false);

setImageSrc(null);



alert(

"Profile photo updated"

);



});



};



}catch(error){


console.log(error);


alert(

"Photo upload failed"

);


}



};







const updateProfile = async()=>{


try{


setLoading(true);



await api.put(

"/auth/profile",

{

name:user.name,

email:user.email,

phone:user.phone,

address:user.address,

password:user.password

}

);



alert(

"Profile Updated Successfully"

);



}catch(error){


console.log(error);


}

finally{


setLoading(false);


}



};



return (
  <div
    className="min-h-screen bg-[#F8F7F1] text-[#2F2B26]"
    style={{
      minHeight: "100vh",
      padding: "28px 42px",
      transform: "translate(0px,0px)"
    }}
  >
    <div
      className="mx-auto max-w-[1400px]"
      style={{
        padding: "0px 18px 42px",
        transform: "translate(0px,0px)"
      }}
    >

      <div
        className="flex items-center justify-between"
        style={{
          padding: "0px 0px 26px",
          transform: "translate(0px,0px)"
        }}
      >
        <div>
          <button
            onClick={() => navigate("/")}
            className="text-[#556B2F] font-semibold text-lg hover:opacity-75 transition"
            style={{
              padding: "4px 0px",
              transform: "translate(0px,0px)"
            }}
          >
            ← Back to Home
          </button>

          <div
            className="flex items-center gap-3"
            style={{
              padding: "10px 0px 0px",
              transform: "translate(0px,0px)"
            }}
          >
            <h1
              className="text-5xl font-black tracking-tight text-[#2F2B26]"
              style={{
                margin: "0px",
                padding: "0px",
                transform: "translate(0px,0px)"
              }}
            >
              My Profile
            </h1>

            <span
              className="text-4xl text-[#556B2F]"
              style={{
                padding: "0px 4px",
                transform: "rotate(-18deg) translate(0px,2px)"
              }}
            >
              🍃
            </span>
          </div>

          <p
            className="text-[#756D63] text-lg"
            style={{
              margin: "6px 0px 0px",
              padding: "0px",
              transform: "translate(0px,0px)"
            }}
          >
            Manage your personal details and account information
          </p>
        </div>

        <button
          onClick={updateProfile}
          className="bg-[#6A8B3A] text-white rounded-full font-bold shadow-sm hover:scale-105 transition"
          style={{
            padding: "12px 25px",
            transform: "translate(0px,0px)"
          }}
        >
          {loading ? "Saving..." : "✎  Update Profile"}
        </button>
      </div>

      {/* Profile header */}
      <div
        className="bg-white border border-[#E8E3D8] rounded-[28px] shadow-[0_12px_35px_rgba(65,75,40,0.08)]"
        style={{
          padding: "28px 30px",
          transform: "translate(0px,0px)"
        }}
      >
        <div
          className="grid grid-cols-[1.2fr_1fr] items-center gap-8"
          style={{
            padding: "0px",
            transform: "translate(0px,0px)"
          }}
        >

          <div
            className="flex items-center gap-6"
            style={{
              padding: "0px",
              transform: "translate(0px,0px)"
            }}
          >
            <div
              className="relative shrink-0"
              style={{
                padding: "0px",
                transform: "translate(0px,0px)"
              }}
            >
              <div
                className="h-32 w-32 rounded-full overflow-hidden border-[7px] border-white shadow-[0_5px_20px_rgba(0,0,0,0.10)] bg-[#EEF2E4] flex items-center justify-center text-5xl text-[#6A8B3A]"
                style={{
                  padding: "0px",
                  transform: "translate(0px,0px)"
                }}
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="profile"
                    className="h-full w-full object-cover"
                    style={{
                      padding: "0px",
                      transform: "translate(0px,0px)"
                    }}
                  />
                ) : (
                  <FaUser />
                )}
              </div>

              <label
                className="absolute bottom-1 right-0 bg-[#6A8B3A] text-white rounded-full cursor-pointer shadow-md text-sm"
                style={{
                  padding: "8px 12px",
                  transform: "translate(4px,4px)"
                }}
              >
                📷
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            <div
              style={{
                padding: "0px",
                transform: "translate(0px,0px)"
              }}
            >
              <div
                className="flex items-center gap-2"
                style={{
                  padding: "0px",
                  transform: "translate(0px,0px)"
                }}
              >
                <h2
                  className="text-3xl font-black"
                  style={{
                    margin: "0px",
                    padding: "0px",
                    transform: "translate(0px,0px)"
                  }}
                >
                  {user.name || "User Name"}
                </h2>

                <span
                  className="text-[#6A8B3A] text-xl"
                  style={{
                    padding: "0px 2px",
                    transform: "translate(0px,0px)"
                  }}
                >
                  ✔
                </span>
              </div>

              <p
                className="text-[#756D63] text-base"
                style={{
                  margin: "5px 0px 0px",
                  padding: "0px",
                  transform: "translate(0px,0px)"
                }}
              >
                {user.email}
              </p>

              <span
                className="inline-block rounded-full bg-[#EEF2E4] text-[#556B2F] text-sm font-semibold"
                style={{
                  marginTop: "9px",
                  padding: "5px 12px",
                  transform: "translate(0px,0px)"
                }}
              >
                User
              </span>
            </div>
          </div>

          <div
            className="grid grid-cols-3 border-l border-[#E8E3D8]"
            style={{
              padding: "8px 0px 8px 25px",
              transform: "translate(0px,0px)"
            }}
          >
            {[
              ["🛍", "Total Orders"],
              ["♡", "Wishlist Items"],
              ["▣", "Member Since"]
            ].map(([icon, label]) => (
              <div
                key={label}
                className="text-center"
                style={{
                  padding: "0px 10px",
                  transform: "translate(0px,0px)"
                }}
              >
                <div
                  className="mx-auto rounded-full bg-[#F0F3E8] text-[#6A8B3A] text-2xl w-16 h-16 flex items-center justify-center"
                  style={{
                    padding: "0px",
                    transform: "translate(0px,0px)"
                  }}
                >
                  {icon}
                </div>

                <p
                  className="font-semibold text-sm"
                  style={{
                    margin: "10px 0px 0px",
                    padding: "0px",
                    transform: "translate(0px,0px)"
                  }}
                >
                  {label}
                </p>

                <p
                  className="text-[#6A8B3A] text-2xl font-black"
                  style={{
                    margin: "3px 0px 0px",
                    padding: "0px",
                    transform: "translate(0px,0px)"
                  }}
                >
                  —
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main columns */}
      <div
        className="grid grid-cols-[1.65fr_1fr] gap-6 items-start"
        style={{
          marginTop: "28px",
          padding: "0px",
          transform: "translate(0px,0px)"
        }}
      >

        <div
          className="space-y-6"
          style={{
            padding: "0px",
            transform: "translate(0px,0px)"
          }}
        >

          {/* Personal Information */}
          <div
            className="bg-white rounded-[24px] border border-[#E8E3D8] shadow-[0_8px_25px_rgba(65,75,40,0.06)]"
            style={{
              padding: "26px 28px",
              transform: "translate(0px,0px)"
            }}
          >
            <div
              className="flex items-center gap-3"
              style={{
                padding: "0px 0px 20px",
                transform: "translate(0px,0px)"
              }}
            >
              <span
                className="bg-[#6A8B3A] text-white rounded-xl"
                style={{
                  padding: "10px 12px",
                  transform: "translate(0px,0px)"
                }}
              >
                <FaUser />
              </span>

              <h2
                className="text-2xl font-black"
                style={{
                  margin: "0px",
                  padding: "0px",
                  transform: "translate(0px,0px)"
                }}
              >
                Personal Information
              </h2>
            </div>

            <div
              className="grid grid-cols-2 gap-5"
              style={{
                padding: "0px",
                transform: "translate(0px,0px)"
              }}
            >
              <div>
                <label className="font-semibold text-sm">
                  Full Name
                </label>

                <div
                  className="flex items-center gap-3 border border-[#D9D4C8] rounded-2xl"
                  style={{
                    marginTop: "7px",
                    padding: "0px 15px",
                    transform: "translate(0px,0px)"
                  }}
                >
                  <FaUser className="text-[#6A8B3A]" />

                  <input
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    className="w-full outline-none bg-transparent"
                    style={{
                      padding: "13px 0px",
                      transform: "translate(0px,0px)"
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-sm">
                  Email Address
                </label>

                <div
                  className="flex items-center gap-3 border border-[#D9D4C8] rounded-2xl"
                  style={{
                    marginTop: "7px",
                    padding: "0px 15px",
                    transform: "translate(0px,0px)"
                  }}
                >
                  <FaEnvelope className="text-[#6A8B3A]" />

                  <input
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    className="w-full outline-none bg-transparent"
                    style={{
                      padding: "13px 0px",
                      transform: "translate(0px,0px)"
                    }}
                  />
                </div>
              </div>

              <div className="col-span-2">
                <label className="font-semibold text-sm">
                  Mobile Number
                </label>

                <div
                  className="flex items-center gap-3 border border-[#D9D4C8] rounded-2xl"
                  style={{
                    marginTop: "7px",
                    padding: "0px 15px",
                    transform: "translate(0px,0px)"
                  }}
                >
                  <FaPhone className="text-[#6A8B3A]" />

                  <input
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    className="w-full outline-none bg-transparent"
                    style={{
                      padding: "13px 0px",
                      transform: "translate(0px,0px)"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div
            className="bg-white rounded-[24px] border border-[#E8E3D8] shadow-[0_8px_25px_rgba(65,75,40,0.06)]"
            style={{
              padding: "26px 28px",
              transform: "translate(0px,0px)"
            }}
          >
            <div
              className="flex items-center gap-3"
              style={{
                padding: "0px 0px 20px",
                transform: "translate(0px,0px)"
              }}
            >
              <span
                className="bg-[#F0F3E8] text-[#6A8B3A] rounded-xl"
                style={{
                  padding: "10px 12px",
                  transform: "translate(0px,0px)"
                }}
              >
                <FaLock />
              </span>

              <h2
                className="text-2xl font-black"
                style={{
                  margin: "0px",
                  padding: "0px",
                  transform: "translate(0px,0px)"
                }}
              >
                Security
              </h2>
            </div>

            <div
              className="grid grid-cols-2 gap-5"
              style={{
                padding: "0px",
                transform: "translate(0px,0px)"
              }}
            >
              <div>
                <label className="font-semibold text-sm">
                  New Password
                </label>

                <div
                  className="flex items-center gap-3 border border-[#D9D4C8] rounded-2xl"
                  style={{
                    marginTop: "7px",
                    padding: "0px 15px",
                    transform: "translate(0px,0px)"
                  }}
                >
                  <FaLock className="text-[#6A8B3A]" />

                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    className="w-full outline-none"
                    style={{
                      padding: "13px 0px",
                      transform: "translate(0px,0px)"
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-sm">
                  Confirm Password
                </label>

                <div
                  className="flex items-center gap-3 border border-[#D9D4C8] rounded-2xl"
                  style={{
                    marginTop: "7px",
                    padding: "0px 15px",
                    transform: "translate(0px,0px)"
                  }}
                >
                  <FaLock className="text-[#6A8B3A]" />

                  <input
                    type="password"
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className="w-full outline-none"
                    style={{
                      padding: "13px 0px",
                      transform: "translate(0px,0px)"
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              className="mt-5 rounded-2xl bg-[#F2F4EA] text-[#4E5F31] text-sm font-medium"
              style={{
                padding: "13px 16px",
                transform: "translate(0px,0px)"
              }}
            >
              🛡️ For your security, use a strong password with at least 8 characters.
            </div>
          </div>
        </div>

        {/* Right column */}
        <div
          className="space-y-6"
          style={{
            padding: "0px",
            transform: "translate(0px,0px)"
          }}
        >

          {/* Address */}
          <div
            className="bg-white rounded-[24px] border border-[#E8E3D8] shadow-[0_8px_25px_rgba(65,75,40,0.06)]"
            style={{
              padding: "26px 28px",
              transform: "translate(0px,0px)"
            }}
          >
            <div
              className="flex items-center gap-3"
              style={{
                padding: "0px 0px 20px",
                transform: "translate(0px,0px)"
              }}
            >
              <span
                className="bg-[#F0F3E8] text-[#6A8B3A] rounded-xl"
                style={{
                  padding: "10px 12px",
                  transform: "translate(0px,0px)"
                }}
              >
                <FaMapMarkerAlt />
              </span>

              <h2
                className="text-2xl font-black"
                style={{
                  margin: "0px",
                  padding: "0px",
                  transform: "translate(0px,0px)"
                }}
              >
                Address
              </h2>
            </div>

            <div
              className="rounded-2xl border-2 border-dashed border-[#C9D3B1] bg-[#FAFBF5]"
              style={{
                padding: "20px",
                transform: "translate(0px,0px)"
              }}
            >
              <FaMapMarkerAlt
                className="mx-auto text-[#6A8B3A] text-3xl"
                style={{
                  padding: "0px",
                  transform: "translate(0px,0px)"
                }}
              />

              <textarea
                name="address"
                value={user.address}
                onChange={handleChange}
                rows="6"
                placeholder="Enter your address"
                className="w-full text-center outline-none resize-none bg-transparent"
                style={{
                  marginTop: "12px",
                  padding: "8px",
                  transform: "translate(0px,0px)"
                }}
              />

              {!user.address && (
                <p
                  className="text-center text-[#7B756D] text-sm"
                  style={{
                    margin: "0px",
                    padding: "0px",
                    transform: "translate(0px,0px)"
                  }}
                >
                  Add your address to make checkout easier
                </p>
              )}
            </div>
          </div>

          {/* Help */}
          <div
            className="rounded-[24px] border border-[#DCE4C9] bg-[#F4F6EA]"
            style={{
              padding: "25px 28px",
              transform: "translate(0px,0px)"
            }}
          >
            <div
              className="flex items-center gap-4"
              style={{
                padding: "0px",
                transform: "translate(0px,0px)"
              }}
            >
              <div
                className="rounded-full bg-[#6A8B3A] text-white text-2xl flex items-center justify-center shrink-0"
                style={{
                  width: "62px",
                  height: "62px",
                  padding: "0px",
                  transform: "translate(0px,0px)"
                }}
              >
                ♧
              </div>

              <div>
                <h3
                  className="text-xl font-black"
                  style={{
                    margin: "0px",
                    padding: "0px",
                    transform: "translate(0px,0px)"
                  }}
                >
                  Need Help?
                </h3>

                <p
                  className="text-sm text-[#756D63]"
                  style={{
                    margin: "5px 0px 0px",
                    padding: "0px",
                    transform: "translate(0px,0px)"
                  }}
                >
                  If you face any issues, our support team is here to help you.
                </p>

                <button
                  onClick={() => navigate("/contact")}
                  className="border border-[#6A8B3A] text-[#556B2F] rounded-full font-semibold hover:bg-[#6A8B3A] hover:text-white transition"
                  style={{
                    marginTop: "14px",
                    padding: "9px 18px",
                    transform: "translate(0px,0px)"
                  }}
                >
                  Contact Support →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Crop Popup */}
    {showCrop && (
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        style={{
          padding: "20px",
          transform: "translate(0px,0px)"
        }}
      >
        <div
          className="bg-white rounded-3xl shadow-2xl"
          style={{
            padding: "24px",
            width: "420px",
            transform: "translate(0px,0px)"
          }}
        >
          <div
            className="relative h-[350px] w-full"
            style={{
              padding: "0px",
              transform: "translate(0px,0px)"
            }}
          >
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              minZoom={0.3}
              maxZoom={5}
              restrictPosition={false}
            />
          </div>

          <div
            className="flex flex-col items-center gap-4"
            style={{
              padding: "16px 0px 0px",
              transform: "translate(0px,0px)"
            }}
          >
            <div
              className="flex items-center justify-center gap-3"
              style={{
                padding: "0px",
                transform: "translate(0px,0px)"
              }}
            >
              <button
                type="button"
                onClick={() =>
                  setZoom((prev) => Math.max(0.3, Number(prev) - 0.1))
                }
                className="w-9 h-9 rounded-full bg-[#6A8B3A] text-white text-xl font-bold"
                style={{
                  padding: "0px",
                  transform: "translate(0px,0px)"
                }}
              >
                −
              </button>

              <input
                type="range"
                min="0.3"
                max="5"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="accent-[#6A8B3A] cursor-pointer"
                style={{
                  width: "190px",
                  padding: "0px",
                  transform: "translate(0px,0px)"
                }}
              />

              <button
                type="button"
                onClick={() =>
                  setZoom((prev) => Math.min(5, Number(prev) + 0.1))
                }
                className="w-9 h-9 rounded-full bg-[#6A8B3A] text-white text-xl font-bold"
                style={{
                  padding: "0px",
                  transform: "translate(0px,0px)"
                }}
              >
                +
              </button>
            </div>

            <button
              onClick={uploadCroppedImage}
              className="bg-[#6A8B3A] text-white rounded-xl font-bold hover:scale-105 transition"
              style={{
                padding: "12px 28px",
                transform: "translate(0px,0px)"
              }}
            >
              Save Photo
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);

}
