import { useState, useEffect } from "react";
import axios from "axios";
// import Navbar from "../Navbar/Navbar";
import "./ProductHome.css";
import { API_URL } from "../../Api_urls"; // Adjust the import path as necessary
import { Link } from "react-router-dom";


function ProductHome() {
  const [showProduct, setShowProduct] = useState([]);
  const [cart, setCart] = useState({});
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  // 1. Fetch all products from backend
  const product_get = async () => {
    try {
      const response = await axios.get(`${API_URL}/P/get-products/`);
      setShowProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    product_get();
  }, []);

  // 2. Flatten nested product list with group and category
  const productsList = showProduct.flatMap(group =>
    group.category.flatMap(cat =>
      cat.products.map(product => ({
        ...product,
        groupName: group["group name"],
        category: cat.category,
      }))
    )
  );

  // 3. Filter logic: by group name, category, and price range
  const filteredProducts = productsList.filter(product => {
    const priceValid =
      product.discountPrice >= priceRange[0] &&
      product.discountPrice <= priceRange[1];
    const groupValid = !selectedGroup || product.groupName === selectedGroup;
    const categoryValid = !selectedCategory || product.category === selectedCategory;
    return priceValid && groupValid && categoryValid;
  });

  // 4. Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // 5. Category options based on selected group
  const categoryOptions = selectedGroup
    ? showProduct.find(g => g["group name"] === selectedGroup)?.category.map(c => c.category) || []
    : [];

  return (
    <div>
      <div className="main-container">
        {/* Sidebar for filter controls */}
        <div className="sidebar">

          {/* Group Filter */}
          <div className="product-filter-container">
            
            <div className="group-filter">
              <select
                value={selectedGroup}
                onChange={(e) => {
                  setSelectedGroup(e.target.value);
                  setSelectedCategory(""); // Reset category on group change
                }}
                >
                <option value="">All</option>
                {[...new Set(showProduct.map(g => g["group name"]))].map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>

            {/* Category Filter (depends on selected group) */}
            {selectedGroup && (
              <div className="category-filter">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All</option>
                  {categoryOptions.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
          )}
          </div>

          {/* Price Range Filter */}
          <div className="price-filter-container">
            <label>Min Price:</label>
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([+e.target.value, priceRange[1]])
              }
            />
            <label>Max Price:</label>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], +e.target.value])
              }
            />
          </div>
        </div>

        {/* Product cards */}
        <div className="card-container">
          <div className="card-list">
            {currentProducts.map((product) => (
              <div key={product.id} className="product-list-card">
                <Link to={`/product_detail/${product.id}`}>
                  <img
                    src={`${API_URL}${product.image}`}
                    alt={product.name}
                    className="card-image"
                  />
                </Link>

                <div className="product-infos">
                  <p className="sponsoreds">
                    Sponsored <span className="brands">{product.brand}</span>
                  </p>
                  <Link to={`/product_detail/${product.id}`}>
                    <p className="product-names">{product.name.length > 23 ? product.name.slice(0, 20) + '...' : product.name}</p>
                  </Link>

                  <p className="product-prices">
                    <span className="prices">₹{product.discountPrice} </span>
                    <span className="original-prices">₹{product.originalPrice} </span>
                    <span className="discounts">{product.discount}% off</span>
                  </p>

                  <p className="product-sizes">
                    Size: <span>{product.size.map(s => s.size).join(", ")}</span>
                  </p>
{/* 
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
                  </div> */}
                </div>
              </div>
            ))}
          </div>


          {/* Pagination Controls */}
          <div className="pagination">
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
              Prev
            </button>
            <span> Page {currentPage} of {totalPages} </span>
            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductHome;
