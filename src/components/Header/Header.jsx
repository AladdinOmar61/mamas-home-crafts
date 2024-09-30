import "./Header.css";
import Icon from "@mdi/react";
import { mdiCartOutline } from "@mdi/js";
import { mdiAccountOutline } from "@mdi/js";
import { useState } from "react";
import { mdiClose } from "@mdi/js";
import { Link } from "react-router-dom";
import { useSupabase } from "../../../lib/hooks/useSupabase";

function Header() {
  const [cartOpened, setCartOpened] = useState(false);
  const { loggedIn, supabase } = useSupabase();

  const handleCart = () => {
    setCartOpened(!cartOpened);
  };


  return (
    <div className="header">
      <Link to="/" className="website-title" style={{ textDecoration: "none" }}>
        Made by Mama
      </Link>
      {loggedIn ? (
        <div className="icons">
          <Icon
            className="cart"
            onClick={handleCart}
            path={mdiCartOutline}
            size={1.5}
          />
          <Icon className="account" path={mdiAccountOutline} size={1.5} />
        </div>
      ) : (
      <div className="login-section">
        <Link className="register" to="/register">
          Register
        </Link>
        <Link className="login" to="/login">
          Login
        </Link>
      </div> )}
      {cartOpened && (
        <div className="cart-menu">
          <Icon className="close-cart" onClick={handleCart} path={mdiClose} />
        </div>
      )}
    </div>
  );
}

export default Header;
