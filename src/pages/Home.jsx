import React from "react";
import Products from "../Components/products";
import { ChevronRight } from "@mui/icons-material";

const Home = () => {
  const rooms = [
    {
      id: "01",
      type: "Bed Room",
      title: "Inner Peace",
      image: "./assets/scroll1.png"
    },
    {
      id: "02",
      type: "Living Room",
      title: "Modern Space",
      image: "./assets/scroll2.png"
    },
    {
      id: "03",
      type: "Kitchen",
      title: "Classic Design",
      image: "./assets/scroll3.png"
    }
  ];

  return (
    <div>
      <div className="w-full h-screen bg-[url('./assets/Homebg.jpg')] bg-cover bg-center flex justify-center items-center">
        <div className="w-[35%] bg-[#fff3e3] pt-16 pl-10 pr-20 rounded-lg relative left-[15%] mt-12">
          <div>
            <h3 className="text-black text-sm ">New Arrival</h3>
            <h1 className="text-[#b88e2f] text-6xl font-bold pt-2 pb-2">
              Discover Our <br />
              New Collection
            </h1>
            <p className="text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis.
            </p>
          </div>

          <div className="mt-8 pb-8">
            <button className="bg-[#b88e2f] py-4 px-12 text-white rounded-sm text-sm font-bold">
              BUY NOW
            </button>
          </div>
        </div>
      </div>

      <div className="w-full min-h-screen">
        <div className="text-center pt-14">
          <h1 className="text-3xl font-bold pb-2">Browse The Range</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi iste
            fugit delectus dolorum ipsam?
          </p>
        </div>

        <div className="w-full h-[650px] flex flex-col items-center justify-center overflow-hidden">
          

          <div className="flex justify-center gap-8 h-[480px]">
            {/* Dining Card */}
            <div className="w-[380px] group cursor-pointer">
              <div className="overflow-hidden rounded-lg h-[420px]">
                <img
                  src="./assets/Dining.png"
                  alt="Dining"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-semibold mt-4 text-center text-[#333]">Dining</h3>
            </div>

            {/* Living Card */}
            <div className="w-[380px] group cursor-pointer">
              <div className="overflow-hidden rounded-lg h-[420px]">
                <img
                  src="./assets/Living.png"
                  alt="Living"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-semibold mt-4 text-center text-[#333]">Living</h3>
            </div>

            {/* Bedroom Card */}
            <div className="w-[380px] group cursor-pointer">
              <div className="overflow-hidden rounded-lg h-[420px]">
                <img
                  src="./assets/Bedroom.png"
                  alt="Bedroom"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-semibold mt-4 text-center text-[#333]">Bedroom</h3>
            </div>
          </div>
        </div>

        <Products />
        <div className="flex justify-center mb-12">
        <button 
          className="px-20 py-3 border border-[#B88E2F] text-[#B88E2F] hover:bg-[#B88E2F] hover:text-white transition-colors duration-300"
          onClick={() => {
            // Add your show more functionality here
            console.log("Show more clicked");
          }}
        >
          Show More
        </button>
      </div>

        {/* Room Inspiration Section */}
        <div className="w-full bg-[#FCF8F3] h-[600px] flex items-center">
          <div className="max-w-[1440px] mx-auto px-28">
            <div className="flex items-center  gap-20">
              {/* Left Content */}
              <div className="w-[35%]">
                <div>
                  <h2 className="text-[40px] leading-tight font-bold text-[#3A3A3A] mb-4">
                    50+ Beautiful rooms <br />inspiration
                  </h2>
                  <p className="text-[#616161] text-lg mb-6">
                    Our designer already made a lot of beautiful prototipe of rooms that inspire you
                  </p>
                  <button className="bg-[#B88E2F] text-white px-8 py-3 flex items-center gap-2 hover:bg-[#967524] transition-colors">
                    Explore More
                  </button>
                </div>
              </div>

              {/* Right Slider */}
              <div className="w-[65%] h-[500px] overflow-hidden">
                <div className="flex gap-6 overflow-x-auto no-scrollbar h-full">
                  {/* First Card (Larger) */}
                  <div className="min-w-[404px]  shrink-0">
                    <div className="relative h-[460px]">
                      <img
                        src="./assets/scroll1.png"
                        alt="Bed Room"
                        className="w-full h-[460px] object-cover"
                      />
                      
                      {/* White Card Overlay */}
                      <div className="absolute bottom-6 left-6 right-6 bg-white p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[#B88E2F] font-bold">01</span>
                          <span className="text-[#616161]">—</span>
                          <span className="text-[#616161]">Bed Room</span>
                        </div>
                        <h3 className="text-2xl font-bold text-[#3A3A3A]">
                          Inner Peace
                        </h3>
                        <button className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#B88E2F] rounded-full flex items-center justify-center">
                          <ChevronRight className="text-white" />
                        </button>
                      </div>
                      <div className="absolute -bottom-6 left-6 flex gap-2 ">
                      <span className="w-3 h-3 rounded-full bg-[#B88E2F]"></span>
                      <span className="w-3 h-3 rounded-full bg-[#D8D8D8]"></span>
                      <span className="w-3 h-3 rounded-full bg-[#D8D8D8]"></span>
                      <span className="w-3 h-3 rounded-full bg-[#D8D8D8]"></span>
                    </div>
      </div>

                
                  </div>

                  {/* Second Card */}
                  <div className="min-w-[372px]  shrink-0">
                    <div className="relative h-[400px] opacity-80">
                      <img
                        src="./assets/scroll2.png"
                        alt="Living Room"
                        className="w-full h-[400px] object-cover"
                      />
                    </div>
                  </div>

                  {/* Third Card */}
                  <div className="min-w-[300px] relative shrink-0">
                    <div className="relative h-[400px] opacity-60">
                      <img
                        src="./assets/scroll1.png"
                        alt="Kitchen"
                        className="w-full h-[400px] object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* write here cards  */}
            </div>
          </div>
        </div>

        {/* Share Your Setup Section */}
        <div className="w-full bg-white py-24">
          <div className="w-[90%] mx-auto px-28">
            <div className="text-center mb-12">
              <p className="text-lg text-[#616161] mb-2">Share your setup with</p>
              <h2 className="text-4xl font-bold text-[#3A3A3A]">#FuniroFurniture</h2>
            </div>

            <div className="grid grid-cols-4 gap-4 h-[600px]">
              {/* Column 1 */}
              <div className="grid gap-4">
                <div className="h-[240px] overflow-hidden">
                  <img 
                    src="./assets/card1.png" 
                    alt="furniture" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="h-[320px] overflow-hidden">
                  <img 
                    src="./assets/card2.png" 
                    alt="furniture" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Column 2 */}
              <div className="grid gap-4">
                <div className="h-[400px] overflow-hidden">
                  <img 
                    src="./assets/card3.png" 
                    alt="furniture" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="h-[160px] overflow-hidden">
                  <img 
                    src="./assets/card4.png" 
                    alt="furniture" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Column 3 */}
              <div className="grid gap-4">
                <div className="h-[280px] overflow-hidden">
                  <img 
                    src="./assets/card5.png" 
                    alt="furniture" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="h-[280px] overflow-hidden">
                  <img 
                    src="./assets/card6.png" 
                    alt="furniture" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              <div className="grid gap-4">
                <div className="h-[400px] overflow-hidden">
                  <img 
                    src="./assets/card3.png" 
                    alt="furniture" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="h-[160px] overflow-hidden">
                  <img 
                    src="./assets/card4.png" 
                    alt="furniture" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
