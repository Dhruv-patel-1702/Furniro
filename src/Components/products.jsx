import React from "react";
import { useNavigate } from "react-router-dom";
import ShareIcon from "@mui/icons-material/Share";
import CompareIcon from "@mui/icons-material/Compare";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useCompare } from '../context/CompareContext';

const Products = () => {
  const navigate = useNavigate();
  const { addToCompare } = useCompare();

  const products = [
    {
      id: 1,
      name: "Syltherine",
      description: "Stylish cafe chair",
      price: "Rp 2.500.000",
      oldPrice: "Rp 3.500.000",
      image: "./assets/Syltherine.png",
      images: [
        "./assets/Muggo.png",
        "./assets/Muggo.png",
        "./assets/Muggo.png",
        "./assets/Muggo.png"
      ],
      discount: "-30%"
    },
    {
      id: 2,
      name: "Leviosa",
      description: "Stylish cafe chair",
      price: "Rp 2.500.000",
      image: "./assets/Pingky.png",
      images: [
        "./assets/Pingky.png",
        "./assets/Pingky.png",
        "./assets/Pingky.png",
        "./assets/Pingky.png"
      ]
    },
    {
      id: 3,
      name: "Lolito",
      description: "Luxury big sofa",
      price: "Rp 7.000.000",
      oldPrice: "Rp 14.000.000",
      image: "./assets/Lolito.png",
      discount: "-50%",
      images: [
        "./assets/Lolito.png",
        "./assets/Lolito.png",
        "./assets/Lolito.png",
        "./assets/Lolito.png"
      ]
    },
    {
      id: 4,
      name: "Respira",
      description: "Outdoor bar table and stool",
      price: "Rp 500.000",
      image: "./assets/Respira.png",
      isNew: true,
      images: [
        "./assets/Pingky.png",
        "./assets/Pingky.png",
        "./assets/Pingky.png",
        "./assets/Pingky.png"
      ]
    },
    {
      id: 5,
      name: "Grifo",
      description: "Night lamp",
      price: "Rp 1.500.000",
      images: [
        "./assets/Grifo.png",
        "./assets/Grifo.png",
        "./assets/Grifo.png",
        "./assets/Grifo.png"
      ]
    },
    {
      id: 6,
      name: "Muggo",
      description: "Small mug",
      price: "Rp 150.000",
      images: [
        "./assets/Muggo.png",
        "./assets/Muggo.png",
        "./assets/Muggo.png",
        "./assets/Muggo.png"
      ],
      isNew: true,
    },
    {
      id: 7,
      name: "Pingky",
      description: "Cute bed set",
      price: "Rp 7.000.000",
      oldPrice: "Rp 14.000.000",
      images: [
        "./assets/Pingky.png",
        "./assets/Pingky.png",
        "./assets/Pingky.png",
        "./assets/Pingky.png"
      ],

      discount: "-50%",
    },
    {
      id: 8,
      name: "Potty",
      description: "Minimalist flower pot",
      price: "Rp 500.000",
      images: [
        "./assets/Potty.png",
        "./assets/Potty.png",
        "./assets/Potty.png",
        "./assets/Potty.png"
      ],
      isNew: true,
    },
  ];

  const handleProductClick = (product) => {
    event.preventDefault();
    event.stopPropagation();
    
    const productData = {
      ...product,
      images: product.images || [product.image, product.image, product.image]
    };
    
    navigate('/singleproduct', { 
      state: { product: productData }
    });
  };

  const handleCompareClick = (event, product) => {
    event.stopPropagation();
    addToCompare(product);
    navigate('/compare');
  };

  return (
    <div className="w-full mx-auto py-8 md:py-16">
      <div className="text-center mb-6 md:mb-[32px]">
        <h2 className="text-2xl md:text-[40px] font-bold text-[#3A3A3A] mb-3">Our Products</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product)}
            className="bg-[#F4F5F7] group relative w-full cursor-pointer mx-auto max-w-[450px]"
          >
            <div className="relative overflow-hidden">
              <div className="relative">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-[200px] sm:h-[280px] md:h-[320px] object-cover transition-all duration-300 group-hover:blur-sm"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {product.discount && (
                <span className="absolute top-3 right-3 md:top-5 md:right-5 bg-[#E97171] text-white px-3 md:px-4 py-1 md:py-1.5 rounded-sm z-10 text-xs md:text-sm">
                  {product.discount}
                </span>
              )}

              <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-[#B88E2F] px-6 md:px-9 py-2 md:py-3 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#B88E2F] hover:text-white z-20 text-sm md:text-base whitespace-nowrap">
                Add to cart
              </button>

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

            <div className="p-3 md:p-5 text-center">
              <h3 className="text-lg md:text-2xl font-semibold text-[#3A3A3A]">{product.name}</h3>
              <p className="text-[#898989] my-2 md:my-2.5 text-sm md:text-base">{product.description}</p>
              <div className="flex justify-center items-center gap-2 md:gap-3">
                <span className="font-bold text-[#3A3A3A] text-base md:text-lg">{product.price}</span>
                {product.oldPrice && (
                  <span className="text-[#B0B0B0] line-through text-sm md:text-base">
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
