import React, { useEffect, useState } from 'react';
import './Home.css';
import Navbar from '../Navbar/Navbar';
import './Home.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from "../../Api_urls";
import {API_URL_PRODUCTS} from '../../Api_urls';

const categories = [
  { name: "Men’s Clothing",   image: "public/men.jpg" },
  { name: "Women’s Clothing", image: "public/women.jpg" },
  { name: "Kid’s Fashion",    image: "public/kids.jpg" },
  { name: "Footwear",         image: "public/footwear2.jpg" },
  { name: "Luggage & Bags",   image: "public/bags2.jpg" },
  { name: "Beauty",           image: "public/beauty1.jpg" },
  { name: "Jewellery",        image: "public/jwellery1.jpg" },
  { name: "Sports",           image: "public/sports1.jpg" },
  { name: "Watches",          image: "public/watche1.jpg" },

];

const CategorySection = () => {
  return (
    <div className="category-container">
      <div className="category-list">
        {categories.map((category, index) => (
          <div key={index} className="category-item">
            <div className="category-image">
              <img src={category.image} alt={category.name} />
            </div>
            <p className="category-name">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// export default CategorySection;

const offerShow = [
  { name: "Watches", price: "₹799",   image: "public/watch-show.avif" },
  { name: "Footwears", price: "₹799", image: "public/footwear-show.avif" },
  { name: "Shirts", price: "₹799",    image: "public/shirt-show.jpg" },
  { name: "Pants", price: "₹799",     image: "public/pant-show2.jpg" },
];

const OfferShowSection = () => {
  return (
    <div className="category-containera">
      {offerShow.map((category, index) => (
        <div key={index} className="category-itema">
          <img src={category.image} alt={category.name} className="category-imagea" />
          <div className="overlaya"></div>
          <p className="category-texta">
            Under {category.price} <br /> {category.name}
          </p>
        </div>
      ))}
    </div>
  );
};



// const Shirtproducts = [
//   { id: 1, brand: "Adidas", name: "Shirt","discountPrice": 1260, originalPrice: 1509, discount: 60, size: ["sm","lg"], image: "public/shirt-show.jpg"},
//   { id: 2, brand: "Adidas", name: "Shirt", "discountPrice": 1270, originalPrice: 2109, discount: 50, size: ["Free"], image: "public/shirt-show.jpg"},
//   { id: 3, brand: "Adidas", name: "Shirt", "discountPrice": 1275, originalPrice: 1149, discount: 60, size: ["Free"], image: "public/shirt-show.jpg"},
//   { id: 4, brand: "Adidas", name: "Shirt", "discountPrice": 1275, originalPrice: 1509, discount: 60, size: ["Free"], image: "public/footwear-show.avif"},
//   { id: 5, brand: "Adidas", name: "Shirt", "discountPrice": 1275, originalPrice: 1100, discount: 40, size: ["Free"], image: "public/shirt-show.jpg"},
//   { id: 6, brand: "Adidas", name: "Shirt", "discountPrice": 1275, originalPrice: 1200, discount: 60, size: ["Free"], image: "public/shirt-show.jpg"},
//   { id: 7, brand: "Adidas", name: "Shirt", "discountPrice": 1275, originalPrice: 2200, discount: 70, size: ["Free"], image: "public/shirt-show.jpg"},
//   { id: 8, brand: "Adidas", name: "Shirt", "discountPrice": 1275, originalPrice: 1300, discount: 25, size: ["Free"], image: "public/shirt-show.jpg"},
//   { id: 9, brand: "Adidas", name: "Shirt", "discountPrice": 1275, originalPrice: 1700, discount: 20, size: ["Free"], image: "public/shirt-show.jpg"},
//   { id: 10, brand: "Adidass", name: "Shirt", "discountPrice": 1285, originalPrice: 1900, discount: 90, size: ["Free"], image: "public/shirt-show.jpg"},
// ];
// const sortedProducts = [...Shirtproducts].sort((a, b) => b.discount - a.discount);

// Function to calculate discounted price
// const calculateDiscountedPrice = (originalPrice, discount) => {
//   return `₹${(originalPrice - (originalPrice * discount / 100)).toFixed(0)}`;
// };

// Sort products by highest discount

// Select top 5 products
// const topProducts = sortedProducts.slice(0, 5);

// Update products with calculated price
// topProducts.forEach(product => {
//   product.price = calculateDiscountedPrice(product.originalPrice, product.discount);
// });

// const ProductCarousel = () => {

//   return (
//     <div className="carousel-container">
//       <div className="product-list">
//         {topProducts.map((product) => (
//           <div key={product.id} className="product-card">
//             <img src={product.image} alt={product.name} className="product-image" />
//             <div className="product-info">
//               <p className="sponsored">Brand <span className="brand">{product.brand}</span></p>
//               <p className="product-name">{product.name}</p>
//               <p className="product-price">
//                 <span className="price">{product.discountPrice}</span>
//                 <span className="original-price">{product.originalPrice}</span>
//                 <span className="discount">{product.discount}% off</span>
//               </p>
//               <p className="product-size">Size: <span>{Array.isArray(product.size) ? product.size.join(", ") : product.size}</span></p>
//             </div>
//           </div>
//         ))}
//         <div className="more-card">
//           <Link to={"/products/shirts"}className="more-card">More</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// { id: 1, brand: "Adidas", name: "Footwear", originalPrice: 1509, discount: 60, size: ["sm","lg"], image: "public/footwear-show.avif"},
// { id: 2, brand: "Adidas", name: "Shirt", originalPrice: 2109, discount: 50, size: ["Free"], image: "public/footwear-show.avif"},
// { id: 3, brand: "Adidas", name: "Shirt", originalPrice: 1149, discount: 60, size: ["Free"], image: "public/footwear-show.avif"},
// { id: 4, brand: "Adidas", name: "Shirt", originalPrice: 1509, discount: 60, size: ["Free"], image: "public/footwear-show.avif"},
// { id: 5, brand: "Adidas", name: "Shirt", originalPrice: 1100, discount: 40, size: ["Free"], image: "public/footwear-show.avif"},
// { id: 6, brand: "Adidas", name: "Shirt", originalPrice: 1200, discount: 60, size: ["Free"], image: "public/footwear-show.avif"},
// { id: 7, brand: "Adidas", name: "Shirt", originalPrice: 2200, discount: 10, size: ["Free"], image: "public/footwear-show.avif"},
// { id: 8, brand: "Adidas", name: "Shirt", originalPrice: 1300, discount: 25, size: ["Free"], image: "public/footwear-show.avif"},
// const FootwearProducts = [
//   { id: 9, brand: "Adidas", name: "Shirt", originalPrice: 1700, discount: 20,         "product_sizes": [
//     {
//         "size": "Free",
//         "stock": 2
//     }
// ],
// image: "public/footwear-show.avif"},
//   { id: 10, brand: "Adidass", name: "Footwear", originalPrice: 1900, discount: 90,         "product_sizes": [
//     {"size": "Free","stock": 2},
//     {
//         "size": "lg",
//         "stock": 2
//     }
//   ],
// image: "public/footwear-show.avif"},
// ];

// // Function to calculate discounted price
// const FootwearcalculateDiscountedPrice = (originalPrice, discount) => {
//   return `₹${(originalPrice - (originalPrice * discount / 100)).toFixed(0)}`;
// };

// // Sort products by highest discount
// const FootwearsortedProducts = [...FootwearProducts].sort((a, b) => b.discount - a.discount);

// // Select top 5 products
// const FootweartopProducts = FootwearsortedProducts.slice(0, 5);

// // Update products with calculated price
// FootweartopProducts.forEach(product => {
//   product.price = FootwearcalculateDiscountedPrice(product.originalPrice, product.discount);
// });

// const FootwearProductCarousel = () => {

//   return (
//     <div className="carousel-container">
//       <div className="product-list">
//         {FootweartopProducts.map((product) => (
//           <div key={product.id} className="product-card">
//             <img src={product.image} alt={product.name} className="product-image" />
//             <div className="product-info">
//               <p className="sponsored">Sponsored <span className="brand">{product.brand}</span></p>
//               <p className="product-name">{product.name}</p>
//               <p className="product-price">
//                 <span className="price">{product.price}</span>
//                 <span className="original-price">{product.originalPrice}</span>
//                 <span className="discount">{product.discount}% off</span>
//               </p>
//               <p className='product-size'>
//                 Size: <span>{product.product_sizes.map(s => s.size).join(', ')}</span>
//               </p>
//             </div>
//           </div>
//         ))}
//         <div className="more-card">
//           <Link to={"/products/shirts"} className="more-card">More</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ProductShow = () => {
//   const [showProduct, setShowProduct] = useState([]);

//   const product_get = async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/P/get-products/');
//       setShowProduct(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     product_get();
//   }, []);

//   return (
//     <div className="product-list">
//       {showProduct.map((product) => (
//         <div key={product.id} className="product-card">
//           <img src={product.image} alt={product.name} className="product-image" />
//           <div className="product-info">
//             <p className="sponsored">
//               Sponsored <span className="brand">{product.product_brand?.name || "No Brand"}</span>
//             </p>
//             <p className="product-name">{product.name}</p>
//             <p className="product-price">
//               <span className="price">{product.price}</span>
//               <span className="original-price">{product.price  - (product.originalPrice * (product.discount / 100)) || ''}</span>
//               <span className="discount">{product.discount_off}% off</span>
//             </p>
//             <p className='product-size'>
//               Size: <span>{product.product_sizes.map(s => s.size).join(', ')}</span>
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

const ProductShow = () => {
  const [showProduct, setShowProduct] = useState([]);

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
  const footwearProducts = showProduct
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
           <Link to={"/products/shirts"}className="more-card">More</Link>
         </div>
      </div>
    </div>
  );
};
const ProductShow2 = () => {
  const [showProduct, setShowProduct] = useState([]);

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
  const footwearProducts = showProduct
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
           <Link to={"/products/shirts"}className="more-card">More</Link>
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
        <ProductShow/>
        <ProductShow2/>
        {/* <ProductCarousel/> */}
        {/* <FootwearProductCarousel/> */}
      </div>
      <hr />
    </div>
  )

}

export default Home;
