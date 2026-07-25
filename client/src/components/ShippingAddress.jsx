import {
  FaUser,
  FaPhone,
  FaCity,
  FaMap,
  FaMapMarkerAlt,
  FaGlobe,
  FaHome,
  FaLocationArrow
} from "react-icons/fa";


const ShippingAddress = ({
  address,
  setAddress
}) => {


  return (

    <div className="checkout-card">


      <div className="checkout-title">

        <div className="title-icon">
          <FaLocationArrow />
        </div>

        <div>
          <h2>
            Shipping Address
          </h2>

          <p>
            Enter your delivery details
          </p>
        </div>

      </div>




      <div className="address-grid">


        <div className="input-box">
          <FaUser />

          <input
            type="text"
            placeholder="Full Name"
            onChange={(e)=>
              setAddress(e.target.value)
            }
          />

        </div>



        <div className="input-box">

          <FaPhone />

          <input
            type="text"
            placeholder="Phone Number"
          />

        </div>



        <div className="input-box">

          <FaCity />

          <input
            type="text"
            placeholder="City"
          />

        </div>



        <div className="input-box">

          <FaMap />

          <input
            type="text"
            placeholder="State"
          />

        </div>



        <div className="input-box">

          <FaMapMarkerAlt />

          <input
            type="text"
            placeholder="Pincode"
          />

        </div>



        <div className="input-box">

          <FaGlobe />

          <select>

            <option>
              India
            </option>

          </select>

        </div>




        <div className="input-box textarea-box">

          <FaHome />

          <textarea
            placeholder="Complete Address"
            onChange={(e)=>
              setAddress(e.target.value)
            }
          />

        </div>



      </div>


    </div>

  );

};


export default ShippingAddress;