import PropTypes from "prop-types";
import { useState, useEffect } from "react";

function ShoppingCartItem({ item, index, removeCartItem }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [totalQuant, setTotalQuant] = useState(0);

    const getStockQuants = () => {
      // debugger;
      let stockCounter = 0;
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        const value = sessionStorage.getItem(key);
        if (key.startsWith("quantity")) {
          stockCounter += parseInt(value, 10);
        }
        console.log(stockCounter);
      }
      setTotalQuant(stockCounter);
    };

    useEffect(() => {
        const storedQuantity = sessionStorage.getItem(`quantity${index}`);
        if (storedQuantity) {
            setQuantity(parseInt(storedQuantity, 10));
        }
  }, [index])
    
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
                  getStockQuants();
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
                const addedQuant = prev + 1 
                sessionStorage.setItem(`quantity${index}`, addedQuant);
                item.quantity = quantity;
                getStockQuants();
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
};

export default ShoppingCartItem;