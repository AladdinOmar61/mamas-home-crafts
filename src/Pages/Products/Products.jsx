import "./Products.css";
import Header from "../../components/Header/Header";
// import plateStand from "../../assets/images/plateOnStand.jpg";
// import pumpkin from "../../assets/images/pumpkin.jpg";
// import platePumpkin from "../../assets/images/platePumpkinStand.jpg";
// import skeletons from "../../assets/images/01104802.jpg";
import { useSupabase } from "../../../lib/hooks/useSupabase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Products() {
  const { getAllProducts } = useSupabase();
  const [prodImgs, setProdImgs] = useState([])
  const [loading, setLoading] = useState(false);

  // const Prodimages = [
  //   skeletons,
  //   plateStand,
  //   pumpkin,
  //   platePumpkin,
  //   plateStand,
  //   pumpkin,
  // ];

  const getAllProds = async () => {
    let allProds = await getAllProducts();
    let prodsBucket = [];
    console.log(allProds.data)
    for (let i = 0; i < allProds.data.length; i++) {
      console.log(allProds.data[i])
      prodsBucket.push(allProds.data[i])
    }
    setProdImgs(prodsBucket);
    setLoading(true);
  };
  
  useEffect(() => {
    getAllProds();
  }, [])

  // console.log(prodImgs);

  return (
    <div className="products-page">
      <Header />
      <h1 className="products-header">Products</h1>
      <div className="product-gallery">
        {loading === true ? (
        prodImgs.map((prod) => 
        (
          // <img key={index} className="product-item" src={prod} ></img>
          <Link to={`/products/${prod.id}`} key={prod.id} className="product-items">
            <img className="product-item" src={prod.images[0]} ></img>
          </Link>
        ))
      ) : (
        <p>Loading...</p>
      )
      }
      </div>
    </div>
  );
}

export default Products;
