import PropTypes from "prop-types";
import { useState, useEffect } from "react";

function ShoppingCartItem({ item, index, removeCartItem, getStockQuants, totalQuant }) {
  const [quantity, setQuantity] = useState(item.quantity);

  useEffect(() => {
    const storedQuantity = sessionStorage.getItem(`quantity${index}`);
    if (storedQuantity) {
      setQuantity(parseInt(storedQuantity, 10));
    }
    getStockQuants();
    console.log("update from shoppingCartItem!");
  }, [index, totalQuant]);

  return (
    <div className="cart-item">
      <img
        className="cart-item-img"
        src={item.images[0]}
        alt="shopping cart item"
      />
      <div className="cart-item-info">
        <p className="product-name">{item.name}</p>
        <p>${(item.price * quantity).toFixed(2)}</p>
        <div className="cart-item-quantity">
          {quantity > 1 && (
            <button
              className="subtract-item"
              onClick={() => {
                setQuantity((prev) => {
                  const subQuant = prev - 1;
                  sessionStorage.setItem(`quantity${index}`, subQuant);
                  return subQuant;
                });
              }}
            >
              -
            </button>
          )}
          <p>{quantity}</p>
          <button
            className="add-item"
            onClick={() => {
              setQuantity((prev) => {
                const addedQuant = prev + 1;
                sessionStorage.setItem(`quantity${index}`, addedQuant);
                item.quantity = quantity;
                return addedQuant;
              });
            }}
          >
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
  totalQuant: PropTypes.number
};

export default ShoppingCartItem;