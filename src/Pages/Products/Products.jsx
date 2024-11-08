import "./Products.css";
import Header from "../../components/Header/Header";
import { useSupabase } from "../../../lib/hooks/useSupabase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Products() {
  const { getAllProducts } = useSupabase();
  const [prodImgs, setProdImgs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hoveredProd, setHoveredProd] = useState(false);

  const handleMouseEnter = (id) => {
    setHoveredProd(id);
  };

  const handleMouseLeave = () => {
    setHoveredProd(null);
  };

  const getAllProds = async () => {
    let allProds = await getAllProducts();
    let prodsBucket = [];
    console.log(allProds.data);
    for (let i = 0; i < allProds.data.length; i++) {
      console.log(allProds.data[i]);
      prodsBucket.push(allProds.data[i]);
    }
    setProdImgs(prodsBucket);
    setLoading(true);
  };

  useEffect(() => {
    getAllProds();
  }, []);

  return (
    <div className="products-page">
      <Header />
      <h1 className="products-header">Products</h1>
      <div className="product-gallery">
        {loading === true ? (
          prodImgs.map((prod) => (
            <Link
              to={`/products/${prod.id}`}
              key={prod.id}
              onMouseEnter={() => handleMouseEnter(prod.id)}
              onMouseLeave={handleMouseLeave}
              className="product-items"
            >
              {hoveredProd === prod.id && (
                <div className="view-product">
                  <p className="view-product-text">VIEW PRODUCT</p>
                </div>
              )}
              <img className="product-item" src={prod.images[0]}></img>
            </Link>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Products;
