import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useShoppingCart } from "../../../lib/hooks/useShoppingCart";

function ShoppingCartItem({ item, index, removeCartItem }) {
  const [itemQuantity, setItemQuantity] = useState(item.quantity);

  const { setQuantity } = useShoppingCart();

  const getStockQuants = () => {
    let stockCounter = 0;
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      const value = sessionStorage.getItem(key);
      if (key.startsWith("quantity")) {
        stockCounter += parseInt(value, 10);
      }
    }
    setQuantity(stockCounter);
  };

  useEffect(() => {
    const storedQuantity = sessionStorage.getItem(`quantity${index}`);
    if (storedQuantity) {
      setItemQuantity(parseInt(storedQuantity, 10));
    }
  }, [index]);

  useEffect(() => {
    getStockQuants();
  }, [itemQuantity]);

  const subtractQuant = () => {
    if (itemQuantity > 1) {
      const newQuantity = itemQuantity - 1;
      setItemQuantity(newQuantity);
      sessionStorage.setItem(`quantity${index}`, newQuantity);
    }
  };

  const addQuant = () => {
    const newQuant = itemQuantity + 1;
    setItemQuantity(newQuant);
    sessionStorage.setItem(`quantity${index}`, newQuant);
  }

  return (
    <div className="cart-item">
      <img
        className="cart-item-img"
        src={item.images[0]}
        alt="shopping cart item"
      />
      <div className="cart-item-info">
        <p className="product-name">{item.name}</p>
        <p>${(item.price * itemQuantity).toFixed(2)}</p>
        <div className="cart-item-quantity">
          {itemQuantity > 1 && (
            <button className="subtract-item" onClick={subtractQuant}>
              -
            </button>
          )}
          <p>{itemQuantity}</p>
          <button className="add-item" onClick={addQuant}>
            +
          </button>
        </div>
        <button onClick={() => removeCartItem(index)} className="remove-button">
          remove
        </button>
      </div>
    </div>
  );
}

ShoppingCartItem.propTypes = {
  item: PropTypes.shape({
    quantity: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  removeCartItem: PropTypes.func.isRequired,
  getStockQuants: PropTypes.func,
  totalQuant: PropTypes.number,
  setTotalQuant: PropTypes.func,
};

export default ShoppingCartItem;