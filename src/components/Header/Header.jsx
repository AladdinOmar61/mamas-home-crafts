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
import { useShoppingCart } from "../../../lib/hooks/useShoppingCart.js";
import Menu from "../Menu/Menu.jsx";

function Header() {
  const [cartOpened, setCartOpened] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [profileOpened, setProfileOpened] = useState(false);

  const profileRef = useRef(null);

  const size = useWindowSize();

  const { user, logout } = useSupabase();
  const { quantity, cart, setCart, setQuantity } = useShoppingCart();

  const handleProfile = () => {
    setProfileOpened(!profileOpened);
  };

  const handleCart = () => {
    setCartOpened(!cartOpened);
  };

  const handleMenu = () => {
    setMenuOpened(!menuOpened);
  };

  const logoutUser = async () => {
    try {
      await logout();
      location.reload();
    } catch {
      console.log("failed to sign out");
    }
  };

  const toggleProfileWindow = () => {
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
  };

  const getStockQuants = () => {
    let stockCounter = 0;
    if (cart) {
      for (let i = 0; i < cart.length; i++) {
        stockCounter += cart[i].quantity;
      }
    }
    setQuantity(stockCounter);
  };

  useEffect(() => {
    const existingCart = JSON.parse(sessionStorage.getItem("products"));
    setCart(existingCart);
    toggleProfileWindow();
    getStockQuants();
  }, [profileOpened]);

  return (
    <div className="header">
      {size.width >= 900 ? (
        <div className="header-nav">
          <div className="header-subnav">
            <Link to="/" className="website-title">
              Mamas Home Crafts
            </Link>
            <Link to="/products" className="products">
              Products
            </Link>
          </div>
          <div className="icons">
            <div className="cart-div">
              <Icon
                className="cart"
                onClick={handleCart}
                path={mdiCartOutline}
                size={1.5}
              />
              {quantity > 0 && <div className="cart-ping">{quantity}</div>}
            </div>
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
                      <Link to="/login">Login</Link>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="mobile-header-nav">
          <div className="menu-div">
            <Icon
              className="cart"
              path={mdiMenu}
              onClick={handleMenu}
              size={size.width < 500 ? 1 : 1.5}
            />
          </div>
          <Link to="/" className="website-title">
            Mamas Home Crafts
          </Link>

          <div className="cart-div">
            <Icon
              className="cart"
              onClick={handleCart}
              path={mdiCartOutline}
              size={size.width < 500 ? 1 : 1.5}
            />
            {quantity > 0 && <div className="mobile-cart-ping">{quantity}</div>}
          </div>
        </div>
      )}
      <ShoppingCart
        getStockQuants={getStockQuants}
        cartOpened={cartOpened}
        handleCart={handleCart}
      />
      <Menu menuOpened={menuOpened} handleMenu={handleMenu} />
    </div>
  );
}

export default Header;
