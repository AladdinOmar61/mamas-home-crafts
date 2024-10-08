import "./Cover.css";
import tempCover from '../../assets/images/nature.jpg';
import { Link } from "react-router-dom";

function Cover() {
  return (
    <div className="cover">
      <img className="cover-img" src={tempCover} alt="cover-image" />
      <div className="cover-prompt">
      <p className="cover-text">
        Hand-crafted home and holiday decor
      </p>
      <button className="explore-btn"><Link to="/products" className="explore-link">Explore</Link></button>
      </div>
    </div>
  );
}

export default Cover;
