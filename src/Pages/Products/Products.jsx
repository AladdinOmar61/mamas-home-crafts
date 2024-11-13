import "./Products.css";
import Header from "../../components/Header/Header";
import { useSupabase } from "../../../lib/hooks/useSupabase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Layout from "../../Layouts/Header_Footer";

function Products() {
  const { getAllProducts, getImages } = useSupabase();
  const [prodImgs, setProdImgs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hoveredProd, setHoveredProd] = useState(false);

  const IMG_URL = "https://upyvpatfxspufwvcuqvl.supabase.co/storage/v1/object/public/products/SkeletonRitualFolder/";

  const handleMouseEnter = (id) => {
    setHoveredProd(id);
  };

  const handleMouseLeave = () => {
    setHoveredProd(null);
  };

  const getBucketImages = async () => {
    const bucketImages = await getImages();
    let imageBasket = [];
    console.log(bucketImages);
    for (let i = 1; i < bucketImages.data.length; i++) {
      imageBasket.push(bucketImages.data[i])
    }
    setProdImgs(imageBasket);
    setLoading(true);
  }

  const getAllProds = async () => {
    let allProds = await getAllProducts();
    let prodsBucket = [];
    console.log(allProds.data);
    for (let i = 0; i < allProds.data.length; i++) {
      console.log(allProds.data[i]);
      prodsBucket.push(allProds.data[i]);
    }
    // setProdImgs(prodsBucket);
    // setLoading(true);
  };

  useEffect(() => {
    // getAllProds();
    getBucketImages();
  }, []);

  return (
    // <div className="products-page">
    //   <Header />
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
              className="product-items"
            >
              {hoveredProd === prod.id && (
                <div className="view-product">
                  <p className="view-product-text">VIEW PRODUCT</p>
                </div>
              )}
              {console.log(IMG_URL+prod.name)}
              <img className="product-item" src={IMG_URL+prod.name}></img>
            </Link>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    {/* </div> */}
    </Layout>
  );
}

export default Products;
