import "./InfoSection.css";
import Icon from "@mdi/react";
import { mdiMotherHeart } from "@mdi/js";
import { mdiPackageVariantClosed } from "@mdi/js";
import { mdiTruckDelivery } from "@mdi/js";
import { useWindowSize } from "@uidotdev/usehooks";

function InfoSection() {
  const size = useWindowSize();
  return (
    <>
      <div className="info-section">
        {size.width <= 650 ? ( <h1>Why Choose Us?</h1> ) : (
          <>
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
        </> 
         )}
      </div>
    </>
  );
}

export default InfoSection;
