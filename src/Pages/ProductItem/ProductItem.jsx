import { useEffect, useState } from "react";
import { useSupabase } from "../../../lib/hooks/useSupabase";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./ProductItem.css";

function ProductItem() {
  const { prodId } = useParams();
  const { getProductItem, setCart } = useSupabase();
  const [prod, setProd] = useState({});
  const [currImg, setCurrImg] = useState("");

  const productItem = async () => {
    const getProdItem = await getProductItem(prodId);
    setProd(getProdItem.data[0]);
    setCurrImg(getProdItem.data[0].images[0]);
  };

  const addToCart = () => {
    const existingCart = JSON.parse(sessionStorage.getItem("products")) || [];
    console.log(existingCart);
    const updatedCart = [...existingCart, prod];
    sessionStorage.setItem("products", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  useEffect(() => {
    productItem();
  }, [prodId]);

  return (
    <>
      <Header />
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

export default ProductItem;
