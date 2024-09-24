import "./Home.css";
import FeatureGallery from "../FeatureGallery/FeatureGallery.jsx";
import InfoBanner from "../InfoBanner/InfoBanner.jsx";
import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import InfoSection from "../InfoSection/InfoSection.jsx";
import Cover from "../Cover/Cover.jsx";
import { useSupabase } from "../../../lib/hooks/useSupabase.js";

// console.log(getUsers)

function Home() {

  const {getUsers} = useSupabase();

  const receivedUsers = async () => {
    const users = await getUsers();
    return users
    // console.log("users: " + JSON.stringify(users));
  }

  receivedUsers()

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
