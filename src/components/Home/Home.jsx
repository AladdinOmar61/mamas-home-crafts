import "./Home.css";
import FeatureGallery from "../FeatureGallery/FeatureGallery.jsx";
import InfoBanner from "../InfoBanner/InfoBanner.jsx";
import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";

function Home() {
  return (
    <>
      <Header />
      <FeatureGallery />
      <InfoBanner />
      <Footer />
    </>
  );
}

export default Home;
