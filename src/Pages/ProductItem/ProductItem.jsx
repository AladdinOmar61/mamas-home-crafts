import { useEffect, useState } from "react";
import { useSupabase } from "../../../lib/hooks/useSupabase";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./ProductItem.css";

function ProductItem() {
  const { prodId } = useParams();
  const { getProductItem, cart, setCart } = useSupabase();
  const [prod, setProd] = useState({});
  const [currImg, setCurrImg] = useState("");
  const [totalQuant, setTotalQuant] = useState(0);

  const productItem = async () => {
    const getProdItem = await getProductItem(prodId);
    setProd(getProdItem.data[0]);
    setCurrImg(getProdItem.data[0].images[0]);
  };

  const addToCart = () => {
    let isDuplicate = false;
    const existingCart = JSON.parse(sessionStorage.getItem("products")) || [];
    if (cart && cart.length > 0)
    {
      for (let i = 0; i < cart.length; i++) { 
        if (cart[i].id === prod.id) {
          const duplicate = cart.find((item) => item.id === prod.id);
          duplicate.quantity += 1;
          isDuplicate = true;
        }
      }
    }
    
    if(isDuplicate === false) {
      const updatedCart = [...existingCart, prod];
      sessionStorage.setItem("products", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
    const currCartLen = JSON.parse(sessionStorage.getItem("products")).length;
    // console.log(currCartLen);
    sessionStorage.setItem(`quantity${currCartLen - 1}`, prod.quantity);
  };

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
    productItem();
  }, [prodId]);

  return (
    <>
      <Header
        getStockQuants={getStockQuants}
        totalQuant={totalQuant}
        setTotalQuant={setTotalQuant}
      />
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
              <button
                className="add-cart-btn"
                onClick={() => {
                  addToCart();
                  getStockQuants();
                }}
              >
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
