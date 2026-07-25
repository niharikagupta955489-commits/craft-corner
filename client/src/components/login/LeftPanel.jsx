import "../styles/leftpanel.css";

import artician from "../assets/artician.png";
import leafTop from "../assets/leaftop.png";
import leafBottom from "../assets/leaf-bottom.png";
import craftcorner from "../assets/craftcorner.png";
const LeftPanel = () => {
  return (
    <div className="left-panel">

      <div className="logo">

        <img src={logo} alt="logo" />

        <span>CraftCorner</span>

      </div>

      <img
        src={leafTop}
        alt=""
        className="leaf-top"
      />

      <div className="hero">

        <h1>

          Handmade

          <span>with passion,</span>

          crafted for you.

        </h1>

        <div className="hero-line"></div>

        <p>

          Discover beautifully handcrafted creations made by talented
          artisans. Every purchase supports local craftsmanship and
          celebrates creativity.

        </p>

      </div>

      <div className="feature-row">

        <div className="feature-card">

          <div className="feature-icon">

            🤲

          </div>

          <h3>Artisan Made</h3>

          <p>Crafted with love and care</p>

        </div>

        <div className="feature-card">

          <div className="feature-icon">

            🛡️

          </div>

          <h3>Premium Quality</h3>

          <p>Finest materials, lasting quality</p>

        </div>

        <div className="feature-card">

          <div className="feature-icon">

            ❤️

          </div>

          <h3>Made with Love</h3>

          <p>Unique handmade creations</p>

        </div>

      </div>

      <img
        src={artisan}
        alt=""
        className="artisan"
      />

      <img
        src={leafBottom}
        alt=""
        className="leaf-bottom"
      />

    </div>
  );
};

export default LeftPanel;