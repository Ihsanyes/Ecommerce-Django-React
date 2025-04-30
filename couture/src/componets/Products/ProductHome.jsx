// import "./CategorySection.css"; // Import CSS file
import Navbar from "../Navbar/Navbar";
import "./ProductHome.css";
import { useState, useEffect } from "react";

// import { Link } from "react-router-dom";
import React from 'react'
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';




function ProductHome() {

  const productsList = [
    { id: 1, brand: "Adidas", name: "Shirt", originalPrice: 1509, discount: 60, size: ["sm","lg"], image: "src/assets/shirt-show.jpg"},
    { id: 2, brand: "Adidas", name: "Shirt", originalPrice: 2109, discount: 50, size: ["Free"], image: "src/assets/shirt-show.jpg"},
    { id: 3, brand: "Adidas", name: "Shirt", originalPrice: 1149, discount: 60, size: ["Free"], image: "src/assets/shirt-show.jpg"},
    { id: 4, brand: "Adidas", name: "Shirt", originalPrice: 1509, discount: 60, size: ["Free"], image: "src/assets/shirt-show.jpg"},
    { id: 5, brand: "Adidas", name: "Shirt", originalPrice: 1100, discount: 40, size: ["Free"], image: "src/assets/shirt-show.jpg"},
    { id: 6, brand: "Adidas", name: "Shirt", originalPrice: 1200, discount: 60, size: ["Free"], image: "src/assets/shirt-show.jpg"},
    { id: 7, brand: "Adidas", name: "Shirt", originalPrice: 2200, discount: 10, size: ["Free"], image: "src/assets/shirt-show.jpg"},
    { id: 8, brand: "Adidas", name: "Shirt", originalPrice: 1300, discount: 25, size: ["Free"], image: "src/assets/shirt-show.jpg"},
    { id: 9, brand: "Adidas", name: "Shirt", originalPrice: 1700, discount: 20, size: ["Free"], image: "src/assets/shirt-show.jpg"},
    { id: 10, brand: "Adidass", name: "Shirt", originalPrice: 1900, discount: 90, size: ["Free"], image: "src/assets/shirt-show.jpg"},
  ];

  const priceFilter = [{
    "price":["Under ₹500","₹500 - ₹1000","₹1000 - ₹2000","Above ₹2000"]

  }]
  const category = [{
    "mensClothing":["Shirts","T Shirts","Inner Wear","Jeans, trousers & more","Winter Wear","Jackets","Ethnic Wear"]
  }]
  return (
    <div>
      <Navbar/>
      <div className="main-container">
        <div className="sidebar">
          <h5>Filter by Price</h5>
          {priceFilter[0].price.map((item, index) => (
            <div key={index} className="filter-item">
              <input type="checkbox" id={`price-${index}`} />
              <label htmlFor={`price-${index}`}>{item}</label>
            </div>
          ))}
          <h5>Category</h5>
          {category[0].mensClothing.map((item, index) => (
            <div key={index} className="filter-item">
              <input type="checkbox" id={`category-${index}`} />
              <label htmlFor={`category-${index}`}>{item}</label>
            </div>
          ))}

        </div>
        <div className="product-container">
          <h2>Product Listing</h2>
          <div className="product-list">
            {productsList.map((product) => (
              <div key={product.id} className="product-list-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-details">
                  <h3>{product.brand}</h3>
                  <p>{product.name}</p>
                  <p>Original Price: ₹{product.originalPrice}</p>
                  <p>Discount: {product.discount}%</p>
                  <p>Size: {product.size.join(", ")}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  )
}

export default ProductHome



// {/* <Container className="main-container">
// <Row className="mt-4">
//   <Col md={3} className="sidebar">
//     {/* <h5>Filter by Price</h5>
//     {priceFilter[0].price.map((item, index) => (
//       <div key={index} className="filter-item">
//         <input type="checkbox" id={`price-${index}`} />
//         <label htmlFor={`price-${index}`}>{item}</label>
//       </div>
//     ))} */}
//     <h5>Category</h5>
//     {category[0].mensClothing.map((item, index) => (
//       <div key={index} className="filter-item">
//         <input type="checkbox" id={`category-${index}`} />
//         <label htmlFor={`category-${index}`}>{item}</label>
//       </div>
//     ))}
//   </Col>
//   <Col md={9}>
//     {/* Product listing will go here */}
//     <h2>Product Listing</h2>
//   </Col>
// </Row>
// </Container> */}