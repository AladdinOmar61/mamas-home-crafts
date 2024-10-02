import './Products.css'
import Header from "../../components/Header/Header";

function Products() {
  return (
    <div className="products-page">
      <Header />
      <h1 className="products-header">Products</h1>
      <div className='product-container'>
      <div className='product-gallery'>
        <div className='product-item'>1</div>
        <div className='product-item'>2</div>
        <div className='product-item'>3</div>
        <div className='product-item'>4</div>
        <div className='product-item'>5</div>
        {/* <div className='product-item'>6</div> */}
        {/* <div className='product-item'>7</div> */}
        {/* <div className='product-item'>8</div> */}
      </div>
      </div>
    </div>
  );
}

export default Products;
