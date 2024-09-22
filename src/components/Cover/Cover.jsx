import "./Cover.css";
import tempCover from '../../assets/images/nature.jpg';

function Cover() {
  return (
    <div className="cover">
      <img className="cover-img" src={tempCover} alt="cover-image" />
      <div className="cover-prompt">
      <p className="cover-text">
        Hand-crafted, <br /> home and <br /> holiday decor
      </p>
      <button className="explore-btn">Explore</button>
      </div>
    </div>
  );
}

export default Cover;
