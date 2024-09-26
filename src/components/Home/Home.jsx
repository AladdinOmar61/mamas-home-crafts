import "./Home.css";
import FeatureGallery from "../FeatureGallery/FeatureGallery.jsx";
import InfoBanner from "../InfoBanner/InfoBanner.jsx";
import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import InfoSection from "../InfoSection/InfoSection.jsx";
import Cover from "../Cover/Cover.jsx";

function Home() {

  return (
    <>
      <Header />
      <Cover/>
      <FeatureGallery />
      <InfoBanner />
      <InfoSection/>
      <Footer />
    </>
  );
}

export default Home;
