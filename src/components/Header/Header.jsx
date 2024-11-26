import "./Header.css";
import Icon from "@mdi/react";
import {
  mdiCartOutline,
  mdiAccountOutline,
  mdiAccountCircle,
  mdiMenu,
} from "@mdi/js";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSupabase } from "../../../lib/hooks/useSupabase";
import { useWindowSize } from "@uidotdev/usehooks";
import ShoppingCart from "../ShoppingCart/ShoppingCart.jsx";

function Header({prodCart}) {
  const [cartOpened, setCartOpened] = useState(false);
  const [profileOpened, setProfileOpened] = useState(false);
  const [cart, setCart] = useState([]);

  const profileRef = useRef(null);

  const size = useWindowSize();

  const { user, logout } = useSupabase();

  const handleProfile = () => {
    setProfileOpened(!profileOpened);
  };

  const handleCart = () => {
    setCartOpened(!cartOpened);
  };

  const logoutUser = async () => {
    try {
      await logout();
      location.reload();
    } catch {
      console.log("failed to sign out");
    }
  };

  useEffect(() => {
    const cartArr = JSON.parse(sessionStorage.getItem("products"));
    console.log(cartArr);
    // setProdCart(cartArr);

    setCart(cartArr);
    console.log(cart);

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpened(!profileOpened);
      }
    };

    if (profileOpened) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileOpened]);

  return (
    <div className="header">
      {size.width >= 900 ? (
        <div className="header-nav">
          <div className="header-subnav">
            <Link to="/" className="website-title">
              Made by Mama
            </Link>
            <Link to="/products" className="products">
              Products
            </Link>
          </div>
          <div className="icons">
            <Icon
              className="cart"
              onClick={handleCart}
              path={mdiCartOutline}
              size={1.5}
            />
            <div className="profile-container" ref={profileRef}>
              <Icon
                className="account"
                onClick={handleProfile}
                path={mdiAccountOutline}
                size={1.5}
              />
              {profileOpened && (
                <div className="ProfileModal">
                  <Icon path={mdiAccountCircle} size={4} />
                  <h1>{user ? user.email : "Guest"}</h1>
                  {user ? (
                    <button className="logout-btn" onClick={logoutUser}>
                      Logout
                    </button>
                  ) : (
                    <button className="login-btn">
                      <Link to="/login" className="">
                        Login
                      </Link>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="mobile-header-nav">
          <Icon path={mdiMenu} size={1.5} />
          <Link to="/" className="website-title">
            Made by Mama
          </Link>

          <div className="icons">
            <Icon
              className="cart"
              onClick={handleCart}
              path={mdiCartOutline}
              size={1.5}
            />
            <Icon
              className="account"
              onClick={handleProfile}
              path={mdiAccountOutline}
              size={1.5}
            />
          </div>
        </div>
      )}
      <ShoppingCart cart={cart} cartOpened={cartOpened} handleCart={handleCart} />
    </div>
  );
}

export default Header;
