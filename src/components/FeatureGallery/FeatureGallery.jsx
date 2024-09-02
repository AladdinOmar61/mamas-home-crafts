import "./FeatureGallery.css";
import plateStand from '../../assets/images/plateOnStand.jpg'
import pumpkin from '../../assets/images/pumpkin.jpg'
import platePumpkin from '../../assets/images/platePumpkinStand.jpg'

function FeatureGallery() {
  return (
    <>
      <div className="feature-container">
        {/* TODO: add actual images once we get them */}
        {/* <div className="feature-track"> */}
        <img className="feature-img" src={plateStand} />
        <img className="feature-img" src={pumpkin}/>
        <img className="feature-img" src={platePumpkin}/>
        {/* </div> */}
      </div>
    </>
  );
}

export default FeatureGallery;
