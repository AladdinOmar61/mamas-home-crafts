import "./Header.css";
import Icon from "@mdi/react";
import { mdiCartOutline } from "@mdi/js";
import { mdiAccountOutline } from "@mdi/js";
import { mdiClose } from "@mdi/js";
import { useState } from "react";

function Header() {

  const [cartOpened, setCartOpened] = useState(false);

  const handleCart = () => {
    setCartOpened(!cartOpened);
  }

  return (
    <div className="header">
      <h1 className="website-title">Made by Mama</h1>
      <div className="icons">
        <Icon className="cart" onClick={handleCart} path={mdiCartOutline} size={1.5} />
        <Icon className="account" path={mdiAccountOutline} size={1.5} />
      </div>
      {cartOpened && 
      <div className="cart-menu">
        <Icon className="close-cart" onClick={handleCart} path={mdiClose} />
      </div>
      }
    </div>
  );
}

export default Header;
