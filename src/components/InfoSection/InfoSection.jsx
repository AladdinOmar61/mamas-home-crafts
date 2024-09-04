import "./InfoSection.css";
import Icon from "@mdi/react";
import { mdiMotherHeart } from "@mdi/js";
import { mdiPackageVariantClosed } from "@mdi/js";
import { mdiTruckDelivery } from "@mdi/js";

function InfoSection() {
  return (
    <>
      <div className="info-section">
        <div className="info-bit" style={{ color: "white" }}>
          <Icon path={mdiMotherHeart} size={5}  />
          <p>Made with love and care by mama</p>
        </div>
        <div className="info-bit" style={{ color: "white" }}>
          <Icon
            path={mdiPackageVariantClosed}
            size={5}
            
          />
          <p>Packaged securely and precisely</p>
        </div>
        <div className="info-bit" style={{ color: "white" }}>
          <Icon path={mdiTruckDelivery} size={5}  />
          <p>Delivered with speed and safety to your doorstep</p>
        </div>
      </div>
    </>
  );
}

export default InfoSection;
