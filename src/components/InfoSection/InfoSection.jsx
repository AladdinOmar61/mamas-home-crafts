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
    { name: mdiMotherHeart, msg: "Made with love and care by mama" },
    { name: mdiPackageVariantClosed, msg: "Packaged securely and precisely" },
    {
      name: mdiTruckDelivery,
      msg: "Delivered with speed and safety to your doorstep",
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
              <Icon path={icon.name} className="info-icon" />
              <p>{icon.msg}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="info-section">
          <div className="info-bit" style={{ color: "white" }}>
            <Icon path={mdiMotherHeart} className="info-icon" />
            <p>Made with love and care by mama</p>
          </div>
          <div className="info-bit" style={{ color: "white" }}>
            <Icon path={mdiPackageVariantClosed} className="info-icon" />
            <p>Packaged securely and precisely</p>
          </div>
          <div className="info-bit" style={{ color: "white" }}>
            <Icon path={mdiTruckDelivery} className="info-icon" />
            <p>Delivered with speed and safety to your doorstep</p>
          </div>
        </div>
      )}
    </>
  );
}

export default InfoSection;
