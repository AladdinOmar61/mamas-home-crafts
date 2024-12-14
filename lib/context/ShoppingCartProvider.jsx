import { useState } from "react";
import ShoppingCartContext from "./ShoppingCartContext";
import PropTypes from "prop-types";


const ShoppingCartProvider = (props) => {
  const [quantity, setQuantity] = useState(0);
  const [cart, setCart] = useState([]);

  return (
    <ShoppingCartContext.Provider
      value={{
        quantity,
        setQuantity,
        cart,
        setCart,
      }}
    >
      {props.children}
    </ShoppingCartContext.Provider>
  );
};

ShoppingCartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShoppingCartProvider;
