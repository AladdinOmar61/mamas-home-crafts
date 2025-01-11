import { useEffect, useState } from "react";
import { useSupabase } from "../../../lib/hooks/useSupabase";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./ProductItem.css";
import { useShoppingCart } from "../../../lib/hooks/useShoppingCart";
import { useWindowSize } from "@uidotdev/usehooks";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function ProductItem() {
  const { prodId } = useParams();
  const { getProductItem } = useSupabase();
  const { cart, setCart, setQuantity } = useShoppingCart();
  const [prod, setProd] = useState({});
  const [currImg, setCurrImg] = useState("");

  const size = useWindowSize();

  const productItem = async () => {
    const getProdItem = await getProductItem(prodId);
    setProd(getProdItem.data[0]);
    setCurrImg(getProdItem.data[0].images[0]);
  };

  const updateCartQuantity = (newQuantity) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === prod.id) {
        return { ...cartItem, quantity: newQuantity };
      }
      return cartItem;
    });
    setCart(updatedCart);
    sessionStorage.setItem("products", JSON.stringify(updatedCart));
  };

  const addToCart = () => {
    let isDuplicate = false;
    let quantCounter = 0;
    const existingCart = JSON.parse(sessionStorage.getItem("products")) || [];
    if (cart && cart.length > 0) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === prod.id) {
          let itemQuant = parseInt(sessionStorage.getItem(`quantity${i}`));
          let addedQuant = itemQuant + 1;
          quantCounter = addedQuant;
          sessionStorage.setItem(`quantity${i}`, addedQuant);
          updateCartQuantity(addedQuant);
          isDuplicate = true;
        }
      }
    }

    if (isDuplicate === false) {
      const updatedCart = [...existingCart, prod];
      sessionStorage.setItem("products", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
    const currCartLen = JSON.parse(sessionStorage.getItem("products")).length;
    sessionStorage.setItem(
      `quantity${currCartLen - 1}`,
      quantCounter === 0 ? 1 : quantCounter
    );
  };

  const getStockQuants = () => {
    let stockCounter = 0;
    if (cart) {
      for (let i = 0; i < cart.length; i++) {
        stockCounter += cart[i].quantity;
      }
    }
    setQuantity(stockCounter);
  };

  useEffect(() => {
    // needs to keep track of session storage stock quantity!
    productItem();
    getStockQuants();
  }, [prodId, cart]);

  return (
    <>
      <Header />
       <div className="single-product">
        <h1>{prod.name}</h1>
        <div className="single-product-info">
          {size.width < 1250 ? (
            //  <>
              <Swiper
                navigation={true}
                spaceBetween={50}
                slidesPerView={2}
                onSlideChange={() => console.log("slide changed")}
                style={{ height: 300 }}
                // onSwiper={(swiper) => console.log(swiper)}
              >
                {prod?.images &&
                  prod?.images.map((pdimg, idx) => (
                <SwiperSlide style={{ backgroundColor: "blue" }}
                  key={idx}>
                  <img src={pdimg} style={{height: 100, width: 100}}></img>
                </SwiperSlide>
                ))}
              </Swiper>
          // </>
          ) : (
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
          )}
          <div className="single-product-desc-section">
            <div>
              <h3>Description</h3>
              <p>{prod.description}</p>
            </div>
            <div>
              <h3>Price</h3>
              <p>${prod.price}</p>
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
