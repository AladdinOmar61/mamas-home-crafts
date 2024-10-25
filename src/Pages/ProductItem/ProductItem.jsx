import { useEffect, useState } from "react";
import { useSupabase } from "../../../lib/hooks/useSupabase";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";

function ProductItem() {
  const prodId = useParams();
  const { getProductItem } = useSupabase();
  const [prodName, setProdName] = useState({});

  const productItem = async () => {
    const getProdItem = await getProductItem(prodId.prodId);
    console.log("prod item: " + JSON.stringify(getProdItem));
    setProdName(getProdItem);
  };

  console.log(prodName.data[0]);

  useEffect(() => {
    productItem();
  }, [prodId]);

  return (
    <>
      <Header />
      <h1>{prodName.data ? prodName.data[0].name : "None"}</h1>
    </>
  );
}

export default ProductItem;
