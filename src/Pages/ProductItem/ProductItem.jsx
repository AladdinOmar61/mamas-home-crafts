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
        <div className="single-product-imgs">
          {prod.Images && prod.Images.length > 0 ? (
            <img className="product-img" src={prod.Images[0]} alt={prod.name} />
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    </>
  );
}

export default ProductItem;
