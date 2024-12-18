import "./InfoBanner.css";
import banner from "../../assets/images/monaStoreBanner.jpg";
import { Link } from "react-router-dom";

function InfoBanner() {
  return (
    <>
      <div className="info-banner">
        <img className="banner-img" src={banner} alt="store banner" />
        <p className="banner-text">
          Home decor for you <br /> or a gift for a friend <br /> Made by mama
        </p>
        <button className="shop-now">
          <Link to="/products" className="shop-now-link">
            Shop now
          </Link>
        </button>
      </div>
    </>
  );
}

export default InfoBanner;
