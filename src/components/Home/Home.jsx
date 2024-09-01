import './Home.css'
import FeatureGallery from '../FeatureGallery/FeatureGallery.jsx';
import NavBar from '../NavBar/NavBar.jsx'
import InfoBanner from '../InfoBanner/InfoBanner.jsx';

function Home() {

  return (
    <>
      <h1>Mona Store</h1>
      <NavBar/>
      <FeatureGallery/>
      <InfoBanner/>
    </>
  )
}

export default Home
