// import "./FeatureGallery.css";
// import plateStand from "../../assets/images/plateOnStand.jpg";
// import pumpkin from "../../assets/images/pumpkin.jpg";
// import platePumpkin from "../../assets/images/platePumpkinStand.jpg";
// import { useEffect, useState } from "react";

// function FeatureGallery() {
//   const images = [plateStand, pumpkin, platePumpkin];

//   const [currIdx, setCurrIdx] = useState(0);
//   const delay = 3000;

//   const next = () => {
//     setCurrIdx((prevIdx) => (prevIdx + 1) % images.length);
//   };

//   const prev = () => {
//     setCurrIdx((prevIdx) => (prevIdx - 1 + images.length) % images.length);
//   };

//   useEffect(() => {
//     const interval = setInterval(next, delay);
//     return () => clearInterval(interval);
//   }, [currIdx]);

//   return (
//     <>
//       <div className="feature-container">
//         <button onClick={prev}>&#10094;</button>
//         {/* TODO: add actual images once we get them */}
//         {images.map((image, index) => (
//           <div
//             className={`"feature-img" ${index === currIdx ? "active" : ""}`}
//             key={index}
//           >
//           <img src={image} />
//           </div>
//         ))}
//         <button onClick={next}>&#10095;</button>
//       </div>
//     </>
//   );
// }

// export default FeatureGallery;

import { useState, useEffect } from "react";
import "./FeatureGallery.css"; // Import CSS for styling
import plateStand from "../../assets/images/plateOnStand.jpg";
import pumpkin from "../../assets/images/pumpkin.jpg";
import platePumpkin from "../../assets/images/platePumpkinStand.jpg";

const Carousel = () => {
  const images = [plateStand, pumpkin, platePumpkin, pumpkin, pumpkin];

  const [currentIndex, setCurrentIndex] = useState(0);
  const delay = 3000; // Auto-scroll delay in milliseconds
  const visibleImages = 3

  // Function to go to the next slide
  const goToNext = () => {
    if (images.length > 3) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (images.length-2));
    }
    // if (currentIndex < images.length - visibleImages) {
    //   setCurrentIndex(currentIndex + 1);
    // }
  };

  // Function to go to the previous slide
  const goToPrevious = () => {
    if (images.length > 3) {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + (images.length-2)) % (images.length-2)
      );
    }
    // if (currentIndex > 0) {
    //   setCurrentIndex(currentIndex - 1);
    // }
  };

  // Auto-scroll effect using useEffect
  useEffect(() => {
    const interval = setInterval(goToNext, delay);
    return () => clearInterval(interval); // Cleanup interval on component unmount
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

export default Carousel;
