import "./Cover.css";
import tempCover from '../../assets/images/tempCover.png';

function Cover() {
  return (
    <div className="cover">
      <img className="cover-img" src={tempCover} alt="cover-image" />
      <div className="cover-prompt">
      <p>
        Hand-crafted, home and holiday decor
      </p>
      <button className="explore">Explore</button>
      </div>
    </div>
  );
}

export default Cover;
