import './Home.css'
import FeatureGallery from '../FeatureGallery/FeatureGallery.jsx';
import NavBar from '../NavBar/NavBar.jsx'
import InfoBanner from '../InfoBanner/InfoBanner.jsx';
import Footer from '../Footer/Footer.jsx';

function Home() {

  return (
    <>
      <h1>Made by Mom</h1>
      <NavBar/>
      <FeatureGallery/>
      <InfoBanner/>
      <Footer/>
    </>
  )
}

export default Home
