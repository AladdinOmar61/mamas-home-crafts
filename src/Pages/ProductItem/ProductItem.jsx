import { useEffect, useState } from "react";
import { useSupabase } from "../../../lib/hooks/useSupabase";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./ProductItem.css";

function ProductItem() {
  const { prodId } = useParams();
  const { getProductItem } = useSupabase();
  const [prod, setProd] = useState({});

  const productItem = async () => {
    const getProdItem = await getProductItem(prodId);
    console.log("prod item: " + JSON.stringify(getProdItem));
    console.log(JSON.stringify(getProdItem.data[0]));
    setProd(getProdItem.data[0]);
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
              <img
                className="product-img"
                src={prod.images[0]}
                alt={prod.name}
              />
            ) : (
              "Loading..."
            )}
            <div className="subimg-container">
              {console.log(prod)}
              {prod?.images && prod?.images.map((pdimg, idx) => (
                <div key={idx} >
                  <img className="product-subimg" src={pdimg} />
                </div>
              ))}
            </div>
          </div>
          <div className="single-product-desc-section">
            <h3>Description</h3>
            <p>{prod.description}</p>
            <h3>Price</h3>
            <p>{prod.price}</p>
            <button className="purchase-btn">Purchase</button>
            <button className="add-cart-btn">Add to cart</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
