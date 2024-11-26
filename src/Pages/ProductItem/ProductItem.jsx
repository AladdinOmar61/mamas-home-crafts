import { useEffect, useState } from "react";
import { useSupabase } from "../../../lib/hooks/useSupabase";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./ProductItem.css";
import PropTypes from "prop-types";

function ProductItem() {
  const { prodId } = useParams();
  const { getProductItem } = useSupabase();
  const [prod, setProd] = useState({});
  const [prodCart, setProdCart] = useState([]);
  const [currImg, setCurrImg] = useState("");

  const productItem = async () => {
    const getProdItem = await getProductItem(prodId);
    setProd(getProdItem.data[0]);
    setCurrImg(getProdItem.data[0].images[0]);
  };

  const addToCart = () => {
    const prodsToCart = JSON.parse(sessionStorage.getItem("products")) || [];
    const updatedProdCart = [...prodsToCart, prod]
    setProdCart(sessionStorage.setItem("products", JSON.stringify(updatedProdCart)));
    // sessionStorage.setItem("products", JSON.stringify(updatedProdCart));
    console.log(prodCart);
  }

  useEffect(() => {
    // setProdCart(cart);
  }, [prodCart])

  useEffect(() => {
    productItem();
  }, [prodId]);

  return (
    <>
      <Header prodCart={prodCart} setProdCart={setProdCart} />
      <div className="single-product">
        <h1>{prod.name}</h1>
        <div className="single-product-info">
          <div className="single-product-imgs">
            {prod.images && prod.images.length > 0 ? (
              <img className="product-img" src={currImg} alt={prod.name} />
            ) : (
              "Loading..."
            )}
            <div className="subimg-container">
              {prod?.images &&
                prod?.images.map((pdimg, idx) => (
                  <div key={idx} onClick={() => setCurrImg(pdimg)}>
                    <img className="product-subimg" src={pdimg} />
                  </div>
                ))}
            </div>
          </div>
          <div className="single-product-desc-section">
            <div>
              <h3>Description</h3>
              <p>{prod.description}</p>
            </div>
            <div>
              <h3>Price</h3>
              <p>{prod.price}</p>
            </div>
            <div>
              <h3>Stock</h3>
              <p>{prod.stock}</p>
            </div>
            <div className="purchase-container">
              <button className="purchase-btn">Purchase</button>
              <button className="add-cart-btn" onClick={addToCart}>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

ProductItem.propTypes = {
  cart: PropTypes.array.isRequired,
}

export default ProductItem;
