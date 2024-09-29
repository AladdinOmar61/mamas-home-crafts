import FeatureGallery from "../../components/FeatureGallery/FeatureGallery.jsx";
import InfoBanner from "../../components/InfoBanner/InfoBanner.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Header from "../../components/Header/Header.jsx";
import InfoSection from "../../components/InfoSection/InfoSection.jsx";
import Cover from "../../components/Cover/Cover.jsx";

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
