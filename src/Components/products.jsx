import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShareIcon from "@mui/icons-material/Share";
import CompareIcon from "@mui/icons-material/Compare";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useCompare } from "../context/CompareContext";
import axios from "axios";

const Products = () => {
  const navigate = useNavigate();
  const { addToCompare } = useCompare();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://ecommerce-shop-qg3y.onrender.com/api/product/displayAll?category="
        );
        if (response.data.success) {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  console.log(products);
  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  const handleProductClick = async (product) => {
    event.preventDefault();
    event.stopPropagation();

    // Fetch product details from the API
    try {
      const response = await axios.get(`https://ecommerce-shop-qg3y.onrender.com/api/product/display?id=${product._id}`);
      console.log("Product details:", response.data); // Log the response to the console
    } catch (error) {
      console.error("Error fetching product details:", error);
    }

    const productData = {
      ...product,
      images: product.images || [product.image, product.image, product.image],
    };

    navigate("/singleproduct", {
      state: { product: productData },
    });

    // Scroll to the top of the page
    window.scrollTo(0, 0);
  };

  const handleCompareClick = (event, product) => {
    event.stopPropagation();
    addToCompare(product);
    navigate("/compare");
  };

  return (
    <div className="w-full mx-auto py-8 md:py-16" >
      <div className="text-center mb-16 md:mt-16 ">
        <h2 className="text-2xl md:text-[40px] font-bold text-[#3A3A3A] mb-3">
          Our Products
        </h2>
      </div>
     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8" > 
        {products.map((product, index) => (
          <div
            key={product.id || `product-${index}`}
            className="bg-[#F4F5F7] group relative w-full cursor-pointer mx-auto max-w-[300px] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            onClick={() => handleProductClick(product)}
         >
            <div className="relative overflow-hidden" >
              <div className="relative">
                <img
                  src={
                    product.product_images?.[0] || 
                    product.image || 
                    'https://ecommerce-shop-qg3y.onrender.com' + product.product_images?.[0] ||
                    '/placeholder-image.jpg'
                  }
                  alt={product.name}
                  className="w-full h-[250px] object-contain bg-white p-2 transition-all duration-300 group-hover:blur-sm"
                  onError={(e) => {
                    const baseUrl = 'https://ecommerce-shop-qg3y.onrender.com'; 
                    if (!e.target.src.startsWith(baseUrl) && product.product_images?.[0]) {
                      e.target.src = baseUrl + product.product_images[0];
                    } 
                  }}
                  style={{ objectFit: 'contain', objectPosition: 'center' }}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {product.discount && (
                <span className="absolute top-3 right-3 md:top-5 md:right-5 bg-[#E97171] text-white px-3 md:px-4 py-1 md:py-1.5 rounded-sm z-10 text-xs md:text-sm">
                  {product.discount}
                </span>
              )}

             

              <div className="absolute bottom-4 md:bottom-6 left-0 right-0 flex justify-center gap-4 md:gap-7 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                <div className="flex items-center gap-1 md:gap-2 text-white cursor-pointer hover:text-[#B88E2F] transition-colors">
                  <ShareIcon fontSize="small" />
                  <span className="text-xs md:text-sm">Share</span>
                </div>
                <div
                  className="flex items-center gap-1 md:gap-2 text-white cursor-pointer hover:text-[#B88E2F] transition-colors"
                  onClick={(e) => handleCompareClick(e, product)}
                >
                  <CompareIcon fontSize="small" />
                  <span className="text-xs md:text-sm">Compare</span>
                </div>
                <div className="flex items-center gap-1 md:gap-2 text-white cursor-pointer hover:text-[#B88E2F] transition-colors">
                  <FavoriteBorderIcon fontSize="small" />
                  <span className="text-xs md:text-sm">Like</span>
                </div>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#3A3A3A] truncate">
                {product.name}
              </h3>
              <p className="text-[#898989] my-2 text-sm line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-center items-center gap-2 ">
                <span className="font-bold text-[#3A3A3A] text-lg">
                  Rs.{product.price}
                </span>
                {product.oldPrice && (
                  <span className="text-[#B0B0B0] line-through text-sm">
                    {product.oldPrice}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;