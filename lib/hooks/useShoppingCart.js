import React from "react";
import ShoppingCartContext from "../context/ShoppingCartContext";

export const useShoppingCart = () => React.useContext(ShoppingCartContext);
