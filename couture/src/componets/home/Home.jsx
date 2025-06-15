import React, { useEffect, useState } from 'react';
import './Home.css';
import Navbar from '../Navbar/Navbar';
import './Home.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from "../../Api_urls";
import { API_URL_PRODUCTS } from '../../Api_urls';
import { useNavigate } from 'react-router-dom';



const CategorySection = () => {

  const navigate = useNavigate()
  const handleFilterClick = (groupName) => {
    navigate(`/products/?group=${encodeURIComponent(groupName)}`);
  };

  return (
    <>



      <div className="category-container">
        <div className="category-list">

          <div className="category-item" onClick={() => handleFilterClick("Men’s Clothing")}>
            <div className="category-image">
              <img src="men.jpg" alt='rr' />
            </div>
            <p className="category-name">Men's Clothing</p>
          </div>

          <div className="category-item" onClick={() => handleFilterClick("Women’s Clothing")}>
            <div className="category-image">
              <img src="women.jpg" alt="Women's Clothing" />
            </div>
            <p className="category-name">Women's Clothing</p>
          </div>

          <div className="category-item" onClick={() => handleFilterClick("Kid’s Fashion")}>
            <div className="category-image">
              <img src="kids.jpg" alt="Kid's Fashion" />
            </div>
            <p className="category-name">Kid's Fashion</p>
          </div>

          <div className="category-item" onClick={() => handleFilterClick("Footwear")}>
            <div className="category-image">
              <img src="footwear2.jpg" alt='Footwear' />
            </div>
            <p className="category-name">Footwear</p>
          </div>

          <div className="category-item" onClick={() => handleFilterClick("Luggage & Bags")}>
            <div className="category-image">
              <img src="bags2.jpg" alt='Luggage & Bags' />
            </div>
            <p className="category-name">Luggage & Bags</p>
          </div>

          <div className="category-item" onClick={() => handleFilterClick("Beauty")}>
            <div className="category-image">
              <img src="beauty1.jpg" alt='Beauty' />
            </div>
            <p className="category-name">Beauty</p>
          </div>

          <div className="category-item" onClick={() => handleFilterClick("Jewellery")}>
            <div className="category-image">
              <img src="jwellery1.jpg" alt='Jewellery' />
            </div>
            <p className="category-name">Jewellery</p>
          </div>

          <div className="category-item" onClick={() => handleFilterClick("Sports")}>
            <div className="category-image">
              <img src="sports1.jpg" alt='Sports' />
            </div>
            <p className="category-name">Sports</p>
          </div>

          <div className="category-item" onClick={() => handleFilterClick("Watches")}>
            <div className="category-image">
              <img src="watche1.jpg" alt='Watches' />
            </div>
            <p className="category-name">Watches</p>
          </div>



        </div>
      </div>
    </>
  );
};


const OfferShowSection = () => {
  const navigate = useNavigate()
  const handlePriceFlterClick = (category) => {
    navigate(`/products/?category=${category}&price=799`)
  }
  return (

    <>

      <div className="category-containera">
        <div className="category-itema" onClick={() => handlePriceFlterClick()}>
          <img src="watch-show.avif" alt='Watches' className="category-imagea" />
          <div className="overlaya"></div>
          <p className="category-texta">
            Under ₹799 <br /> Watches
          </p>
        </div>

        <div className="category-itema" onClick={() => handlePriceFlterClick()}>
          <img src="footwear-show.avif" alt='Footwears' className="category-imagea" />
          <div className="overlaya"></div>
          <p className="category-texta">
            Under ₹799 <br /> Footwears
          </p>
        </div>

        <div className="category-itema" onClick={() => handlePriceFlterClick('Shirts')}>
          <img src="shirt-show.jpg" alt='Shirts' className="category-imagea" />
          <div className="overlaya"></div>
          <p className="category-texta">
            Under ₹799 <br /> Shirts
          </p>
        </div>

        <div className="category-itema" onClick={() => handlePriceFlterClick()}>
          <img src="pant-show2.jpg" alt='Pants' className="category-imagea" />
          <div className="overlaya"></div>
          <p className="category-texta">
            Under ₹799 <br /> Pants
          </p>
        </div>
      </div>
    </>
  );
};


const ProductShow = () => {
  const [showProducts, setShowProduct] = useState([]);
  console.log(showProducts)
  const navigate = useNavigate()
  const handleFilterClick = (groupName) => {
    navigate(`/products/?group=${encodeURIComponent(groupName)}`);
  }

  const product_get = async () => {
    try {
      const response = await axios.get(`${API_URL_PRODUCTS}`);
      setShowProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    product_get();
  }, []);

  // ✅ Filter only "Footwear" group and map its products
  const footwearProducts = showProducts
    .filter(group => group["group name"] === "Footwear")
    .flatMap(group =>
      group.category.flatMap(cat => cat.products)
    );


  return (
    <div className="carousel-container">
      <div className="product-list">
        {footwearProducts.map((product) => (
          <Link to={`/product_detail/${product.id}`} key={product.id}>
            <div key={product.id} className="product-card">
              <img src={`${API_URL}${product.image}`} alt={product.name} className="product-image" />
              <div className="product-info">
                <p className="sponsored">
                  Sponsored <span className="brand">{product.brand || "No Brand"}</span>
                </p>
                <p className="product-name">{product.name.length > 23 ? product.name.slice(0, 20) + '...' : product.name}</p>
                <p className="product-price">
                  <span className="price">₹{product.discountPrice}</span>
                  <span className="original-price">₹{product.originalPrice}</span>
                  <span className="discount">{product.discount}% off</span>
                </p>
                <p className='product-size'>
                  Size: <span>{product.size.map(s => s.size).join(', ')}</span>
                </p>
              </div>
            </div>
          </Link>
        ))}
        <div className="more-card">
          <p onClick={()=>handleFilterClick('Footwear')} className="more-card">More</p>
        </div>
      </div>
    </div>
  );
};
const ProductShow2 = () => {
  const [showProducts, setShowProduct] = useState([]);
    const navigate = useNavigate()
  const handleFilterClick = (groupName) => {
    navigate(`/products/?group=${encodeURIComponent(groupName)}`);
  }

  const product_get = async () => {
    try {
      const response = await axios.get(`${API_URL_PRODUCTS}`);
      setShowProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    product_get();
  }, []);

  // ✅ Filter only "Footwear" group and map its products
  const footwearProducts = showProducts
    .filter(group => group["group name"] === "Men’s Clothing")
    .flatMap(group =>
      group.category.flatMap(cat => cat.products)
    );


  return (
    <div className="carousel-container">
      <div className="product-list">
        {footwearProducts.map((product) => (
          <Link to={`/product_detail/${product.id}`} key={product.id}>
            <div key={product.id} className="product-card">
              <img src={`${API_URL}${product.image}`} alt={product.name} className="product-image" />
              <div className="product-info">
                <p className="sponsored">
                  Sponsored <span className="brand">{product.brand || "No Brand"}</span>
                </p>
                <p className="product-name">{product.name.length > 23 ? product.name.slice(0, 20) + '...' : product.name}</p>
                <p className="product-price">
                  <span className="price">₹{product.discountPrice}</span>
                  <span className="original-price">₹{product.originalPrice}</span>
                  <span className="discount">{product.discount}% off</span>
                </p>
                <p className='product-size'>
                  Size: <span>{product.size.map(s => s.size).join(', ')}</span>
                </p>
              </div>
            </div>
          </Link>
        ))}
        <div className="more-card">
          <p onClick={()=>handleFilterClick('Men’s Clothing')} className="more-card">More</p>
        </div>
      </div>
    </div>
  );
};



function Home() {
  return (
    <div>
      <div className="section-container">
        <CategorySection />
        <OfferShowSection />
        <ProductShow />
        <ProductShow2 />
        {/* <ProductCarousel/> */}
        {/* <FootwearProductCarousel/> */}
      </div>
      <hr />
    </div>
  )

}

export default Home;
