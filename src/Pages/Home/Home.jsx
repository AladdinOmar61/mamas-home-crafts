import FeatureGallery from "../../components/FeatureGallery/FeatureGallery.jsx";
import InfoBanner from "../../components/InfoBanner/InfoBanner.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Header from "../../components/Header/Header.jsx";
import InfoSection from "../../components/InfoSection/InfoSection.jsx";
import Cover from "../../components/Cover/Cover.jsx";
import { useSupabase } from "../../../lib/hooks/useSupabase.js";
import { useEffect } from "react";

function Home() {
  const { loggedIn, checkUserLogin } = useSupabase();

  useEffect(() => {
    if (loggedIn === true) {
    checkUserLogin()
    }
  }, [])

  return (
    <>
      <Header />
      <Cover />
      <FeatureGallery />
      <InfoBanner />
      <InfoSection />
      <Footer />
    </>
  );
}

export default Home;
