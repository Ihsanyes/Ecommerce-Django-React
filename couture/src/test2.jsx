import axios from "axios";
import Navbar from "../Navbar/Navbar";
import "./ProductHome.css";
import { useState,useEffect } from "react";

function ProductHome() {
  const [cart, setCart] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(15);
  const [priceFilters, setPriceFilters] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);

  // Restructured product data by categories
  const categoryProducts = [
    {
      id: 1,
      category: "Shirts",
      products: [
        { id: 1, brand: "Adidas", name: "Shirt", originalPrice: 1509, discount: 60, size: ["sm","lg"], image: "/shirt-show.jpg", category: "Shirts"},
        { id: 7, brand: "Adidas", name: "Formal Shirt", originalPrice: 2200, discount: 10, size: ["Free"], image: "/shirt-show.jpg", category: "Shirts"},
        { id: 12, brand: "Adidas", name: "Shirt", originalPrice: 2109, discount: 50, size: ["Free"], image: "/shirt-show.jpg", category: "Shirts"},
        { id: 17, brand: "Adidas", name: "Formal Shirt", originalPrice: 2109, discount: 50, size: ["Free"], image: "/shirt-show.jpg", category: "Shirts"},
      ]
    },
    {
      id: 2,
      category: "T Shirts",
      products: [
        { id: 2, brand: "Adidas", name: "T-Shirt", originalPrice: 2109, discount: 50, size: ["Free"], image: "/shirt-show.jpg", category: "T Shirts"},
        { id: 8, brand: "Adidas", name: "Casual T-Shirt", originalPrice: 1300, discount: 25, size: ["Free"], image: "/shirt-show.jpg", category: "T Shirts"},
        { id: 13, brand: "Adidas", name: "T-Shirt", originalPrice: 2109, discount: 50, size: ["Free"], image: "/shirt-show.jpg", category: "T Shirts"},
        { id: 18, brand: "Adidas", name: "Casual T-Shirt", originalPrice: 2109, discount: 50, size: ["Free"], image: "/shirt-show.jpg", category: "T Shirts"},
      ]
    },
    {
      id: 3,
      category: "Jeans, trousers & more",
      products: [
        { id: 3, brand: "Adidas", name: "Jeans", originalPrice: 1149, discount: 60, size: ["Free"], image: "/shirt-show.jpg", category: "Jeans, trousers & more"},
        { id: 9, brand: "Adidas", name: "Track Pants", originalPrice: 1700, discount: 20, size: ["Free"], image: "/shirt-show.jpg", category: "Jeans, trousers & more"},
        { id: 14, brand: "Adidas", name: "Jeans", originalPrice: 2109, discount: 50, size: ["Free"], image: "/shirt-show.jpg", category: "Jeans, trousers & more"},
        { id: 19, brand: "Adidas", name: "Track Pants", originalPrice: 2109, discount: 50, size: ["Free"], image: "/shirt-show.jpg", category: "Jeans, trousers & more"},
      ]
    },
    {
      id: 4,
      category: "Footwear",
      products: [
        { id: 4, brand: "Adidas", name: "Shoes", originalPrice: 1509, discount: 60, size: ["Free"], image: "/footwear-show.avif", category: "Footwear"},
      ]
    },
    {
      id: 5,
      category: "Jackets",
      products: [
        { id: 5, brand: "Adidas", name: "Jacket", originalPrice: 1100, discount: 40, size: ["Free"], image: "/shirt-show.jpg", category: "Jackets"},
        { id: 11, brand: "Adidas", name: "Hoodie", originalPrice: 2109, discount: 50, size: ["Free"], image: "/shirt-show.jpg", category: "Jackets"},
        { id: 15, brand: "Adidas", name: "Jacket", originalPrice: 2109, discount: 50, size: ["Free"], image: "/shirt-show.jpg", category: "Jackets"},
        { id: 22, brand: "Adidas", name: "Hoodie", originalPrice: 3109, discount: 10, size: ["Free"], image: "/shirt-show.jpg", category: "Jackets"},
      ]
    },
    {
      id: 6,
      category: "Winter Wear",
      products: [
        { id: 6, brand: "Adidas", name: "Winter Shirt", originalPrice: 1200, discount: 60, size: ["Free"], image: "/shirt-show.jpg", category: "Winter Wear"},
        { id: 10, brand: "Adidas", name: "Sweater", originalPrice: 1900, discount: 90, size: ["Free"], image: "/shirt-show.jpg", category: "Winter Wear"},
        { id: 20, brand: "Adidas", name: "Sweater", originalPrice: 2109, discount: 50, size: ["Free"], image: "/shirt-show.jpg", category: "Winter Wear"},
      ]
    }
  ];

  // Flatten the products array for filtering and pagination
  const productsList = categoryProducts.flatMap(category => category.products);

  // Calculate discounted prices
  const calculateDiscountedPrice = (originalPrice, discount) => {
    return (originalPrice - (originalPrice * discount / 100)).toFixed(0);
  };

  // Process products
  const processedProducts = productsList.map(product => ({
    ...product,
    price: calculateDiscountedPrice(product.originalPrice, product.discount),
    finalPrice: calculateDiscountedPrice(product.originalPrice, product.discount)
  }));

  // Filter products based on selected filters
  const filteredProducts = processedProducts.filter(product => {
    // Price filter
    const priceMatch = priceFilters.length === 0 || priceFilters.some(filter => {
      const price = product.finalPrice;
      if (filter === "Under ₹500") return price < 500;
      if (filter === "₹500 - ₹1000") return price >= 500 && price <= 1000;
      if (filter === "₹1000 - ₹2000") return price >= 1000 && price <= 2000;
      if (filter === "Above ₹2000") return price > 2000;
      return true;
    });

    // Category filter
    const categoryMatch = categoryFilters.length === 0 || 
                         categoryFilters.includes(product.category);

    return priceMatch && categoryMatch;
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle filter changes
  const handlePriceFilterChange = (filter) => {
    setPriceFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
    setCurrentPage(1);
  };

  const handleCategoryFilterChange = (category) => {
    setCategoryFilters(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  // Get unique category options from the structured data
  const categoryOptions = categoryProducts.map(cat => cat.category);
  const priceFilterOptions = ["Under ₹500", "₹500 - ₹1000", "₹1000 - ₹2000", "Above ₹2000"];

  return (
    <div>
      <Navbar cartCount={Object.values(cart).reduce((sum, qty) => sum + qty, 0)} />
      <div className="main-container">
        <div className="sidebar">
          <h5>Filter by Price</h5>
          {priceFilterOptions.map((item, index) => (
            <div key={index} className="filter-item">
              <input 
                type="checkbox" 
                id={`price-${index}`}
                checked={priceFilters.includes(item)}
                onChange={() => handlePriceFilterChange(item)}
              />
              <label htmlFor={`price-${index}`}>{item}</label>
            </div>
          ))}

          <h5>Category</h5>
          {categoryOptions.map((item, index) => (
            <div key={index} className="filter-item">
              <input 
                type="checkbox" 
                id={`category-${index}`}
                checked={categoryFilters.includes(item)}
                onChange={() => handleCategoryFilterChange(item)}
              />
              <label htmlFor={`category-${index}`}>{item}</label>
            </div>
          ))}
        </div>

        <div className="card-container">
          <div className="card-list">
            {currentProducts.map((product) => (
              <div key={product.id} className="product-list-card">
                <img src={product.image} alt={product.name} className="card-image" />
                <div className="product-infos">
                  <p className="sponsoreds">Sponsored <span className="brands">{product.brand}</span></p>
                  <p className="product-names">{product.name}</p>
                  <p className="product-prices">
                    <span className="prices">₹{product.price}</span>
                    <span className="original-prices">₹{product.originalPrice}</span>
                    <span className="discounts">{product.discount}% off</span>
                  </p>
                  <p className="product-sizes">
                    Size: <span>{product.size.join(", ")}</span>
                  </p>
                  <div className="add-cart">
                    <button
                      onClick={() =>
                        setCart((prev) => ({
                          ...prev,
                          [product.id]: Math.max((prev[product.id] || 0) - 1, 0),
                        }))
                      }
                      disabled={!cart[product.id]}
                    >
                      -
                    </button>
                    <span>{cart[product.id] || 0}</span>
                    <button
                      onClick={() =>
                        setCart((prev) => ({
                          ...prev,
                          [product.id]: (prev[product.id] || 0) + 1,
                        }))
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="pagination">
              <button 
                onClick={() => paginate(currentPage - 1)} 
                disabled={currentPage === 1}
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={currentPage === index + 1 ? 'active' : ''}
                >
                  {index + 1}
                </button>
              ))}
              
              <button 
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          ) : (
            <div className="no-results">
              No products match your filters. Try adjusting your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductHome;