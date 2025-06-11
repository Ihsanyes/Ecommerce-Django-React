import { useState, useEffect } from "react";
import axiosInstance from "../auth/Axios_instance";
import { API_URL } from "../../Api_urls";
import { Link, useLocation } from "react-router-dom";
import "./ProductHome.css";

function ProductHome() {
  const location = useLocation();
  const groupName = new URLSearchParams(location.search).get("group");
  const categoryName = new URLSearchParams(location.search).get("category");
  const maxPrice = new URLSearchParams(location.search).get("price")

  const [showProduct, setShowProduct] = useState([]);
  // const [cart, setCart] = useState({});
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;
  console.log(priceRange)

  // Fetch products and set group filter if in URL
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get(`/P/get-products/`);
      const productsData = response.data;
      setShowProduct(productsData);

      if (groupName) {
        const matchedGroup = productsData.find(
          (g) => g["group name"] === groupName
        );
        if (matchedGroup) {
          setSelectedGroup(matchedGroup["group name"]);
        }
      }

      if (categoryName) {
        const matchedCategory = productsData
          .flatMap((g) => g.category)
          .find((c) => c.category === categoryName);
        if (matchedCategory) {
          setSelectedCategory(matchedCategory.category);
        }
      }

      if (maxPrice) {
        setPriceRange([0, parseInt(maxPrice)]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchProducts();
}, [groupName, categoryName, maxPrice]); // ✅ include all 3 in deps


  // Flatten nested product structure
  const productsList = showProduct.flatMap((group) =>
    group.category.flatMap((cat) =>
      cat.products.map((product) => ({
        ...product,
        groupName: group["group name"],
        category: cat.category,
      }))
    )
  );

  // Filter logic
  const filteredProducts = productsList.filter((product) => {
    // maxPrice?setPriceRange([0,799]):null
    const priceValid =
    (!maxPrice || product.discountPrice <= parseInt(maxPrice)) &&
      product.discountPrice >= priceRange[0] &&
      product.discountPrice <= priceRange[1];
    const groupValid = !selectedGroup || product.groupName === selectedGroup;
    const categoryValid =
      !selectedCategory || product.category === selectedCategory;
    return priceValid && groupValid && categoryValid;
  });
  console.log(filteredProducts)

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Category dropdown options
  const categoryOptions = selectedGroup
    ? showProduct.find((g) => g["group name"] === selectedGroup)?.category.map((c) => c.category) || []
    : [];

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "10px" }}>
        {groupName ? `Showing: ${groupName}` : "All Products"}
      </h2>

      <div className="main-container">
        {/* Sidebar Filters */}
        <div className="sidebar">
          {/* Group Filter */}
          <div className="product-filter-container">
            <div className="group-filter">
              <select
                value={selectedGroup}
                onChange={(e) => {
                  setSelectedGroup(e.target.value);
                  setSelectedCategory(""); // Reset category
                }}
              >
                <option value="">All Groups</option>
                {[...new Set(showProduct.map((g) => g["group name"]))].map(
                  (group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Category Filter */}
            {selectedGroup && (
              <div className="category-filter">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
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

        {/* Product Cards */}
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
                    <p className="product-names">
                      {product.name.length > 23
                        ? product.name.slice(0, 20) + "..."
                        : product.name}
                    </p>
                  </Link>

                  <p className="product-prices">
                    <span className="prices">₹{product.discountPrice} </span>
                    <span className="original-prices">
                      ₹{product.originalPrice}{" "}
                    </span>
                    <span className="discounts">
                      {product.discount}% off
                    </span>
                  </p>

                  <p className="product-sizes">
                    Size:{" "}
                    <span>
                      {product.size?.map((s) => s.size).join(", ") || "Free"}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span>
              {" "}
              Page {currentPage} of {totalPages}{" "}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductHome;
