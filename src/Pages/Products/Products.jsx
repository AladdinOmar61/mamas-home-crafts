import "./Products.css";
import Header from "../../components/Header/Header";
import plateStand from "../../assets/images/plateOnStand.jpg";
import pumpkin from "../../assets/images/pumpkin.jpg";
import platePumpkin from "../../assets/images/platePumpkinStand.jpg";
import skeletons from "../../assets/images/01104802.jpg";
import { useSupabase } from "../../../lib/hooks/useSupabase";
import { useEffect, useState } from "react";

function Products() {
  const { getAllProducts } = useSupabase();
  const [prodImgs, setProdImgs] = useState([])

  const Prodimages = [
    skeletons,
    plateStand,
    pumpkin,
    platePumpkin,
    plateStand,
    pumpkin,
  ];

  useEffect(() => {
    // getAllProducts();
    const getAllProds = async () => {
      let allProds = await getAllProducts();
      console.log(allProds.data)
      for (let i = 0; i < allProds.data.length-1; i++) {
        console.log(allProds.data[i].Images[0])
        // setProdImgs(...allProds.data[i].images[0])
      }
    };
    getAllProds();
  }, [])

  console.log(prodImgs);

  return (
    <div className="products-page">
      <Header />
      <h1 className="products-header">Products</h1>
      <div className="product-gallery">
        {Prodimages.map((img, index) => (
          <img key={index} className="product-item" src={img} />
        ))}
      </div>
    </div>
  );
}

export default Products;
