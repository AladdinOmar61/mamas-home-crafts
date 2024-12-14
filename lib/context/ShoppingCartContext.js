import { createContext } from "react";

const ShoppingCartContext = createContext({
  quantity: 0,
  setQuantity: () => Number,
  cart: [],
  setCart: () => [],
});

export default ShoppingCartContext;