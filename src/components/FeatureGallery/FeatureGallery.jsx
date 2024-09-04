import { useState, useEffect } from "react";
import "./FeatureGallery.css"; // Import CSS for styling
import plateStand from "../../assets/images/plateOnStand.jpg";
import pumpkin from "../../assets/images/pumpkin.jpg";
import platePumpkin from "../../assets/images/platePumpkinStand.jpg";

const FeatureGallery = () => {
  const images = [plateStand, pumpkin, platePumpkin, plateStand, pumpkin];

  const [currentIndex, setCurrentIndex] = useState(0);
  const delay = 3000;
  const visibleImages = 3

  const goToNext = () => {
    if (images.length > 3) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (images.length-2));
    }
  };

  const goToPrevious = () => {
    if (images.length > 3) {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + (images.length-2)) % (images.length-2)
      );
    }
  };

  useEffect(() => {
    const interval = setInterval(goToNext, delay);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="carousel">
      {images.length > 3 && (
        <button className="prev" onClick={goToPrevious}>
          &#10094;
        </button>
      )}
      <div
        className="carousel-inner"
        style={{ transform: `translateX(-${currentIndex * (100 / visibleImages)}%)` }}
      >
        {images.map((image, index) => (
          <img
            className='carousel-item'
            key={index}
            src={image}
            alt={`Slide ${index}`}
          />
        ))}
      </div>
      {images.length > 3 && (
        <button className="next" onClick={goToNext}>
          &#10095;
        </button>
      )}
    </div>
  );
};

export default FeatureGallery;
