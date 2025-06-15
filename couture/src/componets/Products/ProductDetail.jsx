import React, { useEffect, useState } from 'react';
import './ProductDetail.css';
import { API_URL } from '../../Api_urls';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../auth/Axios_instance';


function ProductDetail() {
  const [product, setProduct] = useState({})
  // const [size, setSize] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(0);
  const { id } = useParams();
  console.log(id);
  console.log(quantity);
  console.log(selectedSize);

  const navigate = useNavigate()
  const handleRedirect = () => {
    navigate('/view_cart'); // Replace with your path
  };
  // const [inStock] = useState({
  //   'S': false,
  //   'M': true,
  //   'L': false
  // });

  const oneProduct = async () => {
    try {
      const response = await axios(`${API_URL}P/get_one_product/${id}`);
      setProduct(response.data)
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }
  useEffect(() => { oneProduct() }, [id])

  // const product = {
  //   brand: 'Adidas',
  //   name: "Men's Shirt Black",
  //   originalPrice: 4499,
  //   discountedPrice: 1109,
  //   discount: 60,
  //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in",
  //   sizes: ['S', 'M', 'L']
  // };

  // const handleSizeSelect = (size) => {
  //   if (inStock[size]) {
  //     setSelectedSize(size);
  //   }
  // };
  const AddCart = async () => {
    if (!selectedSize || quantity <= 0) {
      alert("Please select a size and quantity before adding to cart.");
      return;
    }
    try {
      const response = await axiosInstance.post(`${API_URL}O/add_cart/`, {
        product_id: id,
        quantity: quantity,
        sizeId: selectedSize.sizeId
      });
      console.log(response.data);
      handleRedirect()
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }
  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity > 0 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  //*********** */ CALCULATE DISCOUNT PRICE
  const discountedPrice = product.price - (product.price * product.discount_off / 100).toFixed(0)


  return (
    <div className="product-detail-container">
      <div className="product-images">
        {/* Replace with your actual image gallery component */}
        <div className="main-image">
          {product.image && (<img src={`${API_URL}${product.image}`} alt={product.name} />)}
        </div>
        <div className="thumbnail-gallery">
          {/* Thumbnails would go here */}
        </div>
      </div>

      <div className="productInfo">
        <h1 className="brandName">{product.product_brand?.name}</h1>
        <h2 className="productName">{product.name}</h2>

        <div className="price-section">
          <span className="real-price">MRP: ₹{product.price}</span>
          <span className="discounted-price">₹{discountedPrice}</span>
          <span className="discount-percent">{product.discount_off}% off</span>
        </div>

        <div className="size-section">
          <p className="product-sizes">
            Size: <span>{product.product_sizes?.map(s => s.size).join(", ")}</span><br />
          </p><br />
          <div className="size-options">
            {product.product_sizes?.map((sizeObj) => (
              <div key={sizeObj.id}>
                <button
                  className={`size-btn ${sizeObj.stock ? 'inStock' : ''} ${!sizeObj.stock ? 'outStock' : ''}`}
                  disabled={!sizeObj.stock}
                  onClick={() => setSelectedSize({ "size": sizeObj.size, "sizeId": sizeObj.id })}

                >
                  {sizeObj.size}<br />
                  {!sizeObj.stock ? <span className="OutStock">Out of stock</span> : <span className="InStock ">In Stock</span>}

                </button>
              </div>
            ))}
          </div>
          <h3 style={!selectedSize ? { visibility: 'hidden' } : {}}>Selected: {selectedSize.size}</h3>
        </div>

        <div className="description-section">
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>

        <div className="quantity-section">
          <div className="quantity-selector">
            <button onClick={() => handleQuantityChange(-1)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange(1)}>+</button>
          </div>
        </div>

        <div className="action-buttons">
          <button className="add-to-cart" onClick={AddCart}>Add to Cart</button>

          <button className="buy-now" onClick={handleRedirect}>View Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;