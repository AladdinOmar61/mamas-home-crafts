import "./InfoSection.css";
import Icon from "@mdi/react";
import { mdiMotherHeart } from "@mdi/js";
import { mdiPackageVariantClosed } from "@mdi/js";
import { mdiTruckDelivery } from "@mdi/js";
import { useWindowSize } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

function InfoSection() {
  const [currIdx, setCurrIdx] = useState(0);
  const size = useWindowSize();
  const icons = [
    { name: mdiMotherHeart, msg: "Made with love by mama" },
    { name: mdiPackageVariantClosed, msg: "Secure packaging" },
    {
      name: mdiTruckDelivery,
      msg: "Delivered with speed and safety",
    },
  ];

  useEffect(() => {
    const interval = setInterval(next, 4900);
    return () => clearInterval(interval);
  }, [currIdx]);

  const next = () => {
    setCurrIdx((prevIndex) => (prevIndex + 1) % icons.length);
  };

  return (
    <>
      {size.width <= 650 ? (
        <div className="mobile-info-section">
          {icons.map((icon, index) => (
            <div
              key={index}
              className={`mobile-info-bit ${index === currIdx ? "active" : ""}`}
              style={{ color: "white" }}
            >
              <Icon path={icon.name} size={1.5} className="info-icon" />
              <p className="info-text">{icon.msg}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="info-section">
          {icons.map((icon, index) => (
            <div
              key={index}
              className="info-bit"
              style={{ color: "white" }}
            >
              <Icon path={icon.name} size={2} className="info-icon" />
              <div className="info-text-container">
              <p className="info-text">{icon.msg}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default InfoSection;
