import "./Products.css";
import { useSupabase } from "../../../lib/hooks/useSupabase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Layouts/Header_Footer";

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
    for (let i = 0; i < allProds.data.length; i++) {
      prodsBucket.push(allProds.data[i]);
    }
    setProdImgs(prodsBucket);
    setLoading(true);
  };

  useEffect(() => {
    getAllProds();
  }, []);

  return (
    <Layout>
      <h1 className="products-header">Products</h1>
      <div className="product-gallery">
        {loading === true ? (
          prodImgs.map((prod) => (
            <Link
              to={`/products/${prod.id}`}
              key={prod.id}
              onMouseEnter={() => handleMouseEnter(prod.id)}
              onMouseLeave={handleMouseLeave}
              className="product-item"
            >
              <img
                className={`product-item-img ${
                  hoveredProd === prod.id ? "blurred-img" : ""
                }`}
                src={prod.images[0]}
              ></img>
              {hoveredProd === prod.id && (
                <div className="view-product">
                  <button className="view-product-btn">VIEW PRODUCT</button>
                  <button className="buy-product-btn">BUY NOW</button>
                </div>
              )}
            </Link>
          ))
        ) : (
          <div className="loading">
            <p>Loading...</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Products;
