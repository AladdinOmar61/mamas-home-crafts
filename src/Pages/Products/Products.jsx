import "./Products.css";
import Header from "../../components/Header/Header";
import plateStand from "../../assets/images/plateOnStand.jpg";
import pumpkin from "../../assets/images/pumpkin.jpg";
import platePumpkin from "../../assets/images/platePumpkinStand.jpg";

function Products() {
  const Prodimages = [
    plateStand,
    pumpkin,
    platePumpkin,
    plateStand,
    pumpkin,
  ];

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
