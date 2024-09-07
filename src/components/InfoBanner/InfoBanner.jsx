import "./InfoBanner.css";
import banner from "../../assets/images/monaStoreBanner.png";

function InfoBanner() {
  return (
    <>
      <div className="info-banner">
        <img className="banner-img" src={banner} alt="store banner" />
        <p className="banner-text">
        Home decor for you <br /> or a gift for a friend <br /> Made by mama

        </p>
        <button className="buy-now">Shop now</button>
      </div>
    </>
  );
}

export default InfoBanner;
