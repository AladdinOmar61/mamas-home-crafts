import "./Menu.css";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import { Link } from "react-router-dom";

function Menu({ menuOpened, handleMenu }) {
  return (
    <div className="menu-modal">
      <ReactModal
        contentLabel="Menu"
        className={{
          base: "MenuModal",
          afterOpen: "MenuModal--after-open",
          beforeClose: "MenuModal--before-close",
        }}
        isOpen={menuOpened}
        onRequestClose={handleMenu}
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
            justifyContent: "flex-start",
            zIndex: 150,
          },
          content: {
            backgroundColor: "white",
            left: 0,
            top: 0,
            width: "470px",
            position: "relative",
            outline: "none",
          },
        }}
      >
        <Icon className="close-menu" onClick={handleMenu} path={mdiClose} />
        <h1 className="menu-header">Menu</h1>
              <hr className="menu-divider" />
              <div className="menu-options">
                  <Link to="/products" className="menu-link">Products</Link>
              </div>
      </ReactModal>
    </div>
  );
}

Menu.propTypes = {
  menuOpened: PropTypes.bool.isRequired,
  handleMenu: PropTypes.func.isRequired,
};

export default Menu;
