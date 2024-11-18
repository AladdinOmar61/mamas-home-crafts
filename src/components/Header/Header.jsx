import "./Header.css";
import Icon from "@mdi/react";
import {
  mdiCartOutline,
  mdiAccountOutline,
  mdiAccountCircle,
  mdiMenu,
  mdiClose,
} from "@mdi/js";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSupabase } from "../../../lib/hooks/useSupabase";
import ReactModal from "react-modal";
// import pumpkin from "../../assets/images/pumpkin.jpg";
import { useWindowSize } from "@uidotdev/usehooks";
import PropTypes from 'prop-types';

function Header() {
  const [cartOpened, setCartOpened] = useState(false);
  const [profileOpened, setProfileOpened] = useState(false);
  const [cart, setCart] = useState([]);
  const profileRef = useRef(null);

  const size = useWindowSize();

  const { user, logout } = useSupabase();

  const handleCart = () => {
    setCartOpened(!cartOpened);
  };

  const handleProfile = () => {
    setProfileOpened(!profileOpened);
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
    setCart(cartArr);
    console.log(cartArr);

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
      <ReactModal
        ariaHideApp={false}
        contentLabel="Shopping Cart"
        className={{
          base: "CartModal",
          afterOpen: "CartModal--after-open",
          beforeClose: "CartModal--before-close",
        }}
        isOpen={cartOpened}
        onRequestClose={handleCart}
        closeTimeoutMS={300}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "flex-end",
            zIndex: 150,
          },
          content: {
            backgroundColor: "white",
            right: 5,
            top: 0,
            marginRight: -5,
            width: "470px",
            position: "relative",
            outline: "none",
          },
        }}
      >
        <Icon className="close-cart" onClick={handleCart} path={mdiClose} />
        <h1 className="cart-header">Shopping Cart</h1>
        <hr className="cart-divider" />
        <div className="cart-item-list">
          {cart && cart.length > 0 ? (
            cart.map((item, index) => (
              <div className="cart-item" key={index}>
                <img
                  className="cart-item-img"
                  src={item.images[0]}
                  alt="shopping cart item"
                />
                <div className="cart-item-info">
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                  <div className="cart-item-quantity">
                    <button className="subtract-item">-</button>
                    <p>0</p>
                    <button className="add-item">+</button>
                  </div>
                  <a href="">remove</a>
                </div>
              </div>
            ))
          ) : (
            <p style={{textAlign: "center"}}>No items in the cart</p>
          )}
        </div>
        <button className="checkout">Checkout</button>
      </ReactModal>
    </div>
  );
}
Header.propTypes = {
  cart: PropTypes.array.isRequired,
  text: PropTypes.string,
};

export default Header;
