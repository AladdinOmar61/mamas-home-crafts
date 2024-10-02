import "./Header.css";
import Icon from "@mdi/react";
import { mdiCartOutline } from "@mdi/js";
import { mdiAccountOutline } from "@mdi/js";
import { useState } from "react";
import { mdiClose } from "@mdi/js";
import { Link } from "react-router-dom";
import { useSupabase } from "../../../lib/hooks/useSupabase";
import ReactModal from "react-modal";
import pumpkin from "../../assets/images/pumpkin.jpg";

function Header() {
  const [cartOpened, setCartOpened] = useState(false);
  const { loggedIn } = useSupabase();

  const handleCart = () => {
    setCartOpened(!cartOpened);
  };

  return (
    <div className="header">
      <div className="header-nav">
      <Link to="/" className="website-title" style={{ textDecoration: "none" }}>
        Made by Mama
      </Link>
      <Link to="/products" className="products">Products</Link>
      </div>
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
        </div>
      )}
      <ReactModal
        contentLabel="Shopping Cart"
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
            marginRight: 40,
            width: "460px",
            position: "relative",
          },
        }}
      >
        <Icon className="close-cart" onClick={handleCart} path={mdiClose} />
        <h1 className="cart-header">Shopping Cart</h1>
        <hr className="cart-divider" />
        <div className="cart-item-list">
          <div className="cart-item">
            <img
              className="cart-item-img"
              src={pumpkin}
              alt="shopping cart item"
            />
            <div className="cart-item-info">
              <p>Name of the product</p>
              <p>$59.00</p>
              <div className="cart-item-quantity">
              <button className="subtract-item">-</button>
              <p>0</p>
               <button className="add-item">+</button>
              </div>
              <a href="">remove</a>
            </div>
          </div>
        </div>
        <button className="checkout">
          Checkout
        </button>
      </ReactModal>
    </div>
  );
}

export default Header;
