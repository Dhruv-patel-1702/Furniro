import React from "react";
import Products from "../Components/products";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <div className="w-full min-h-[100vh] bg-[url('/assets/Homebg.png')] bg-cover bg-center relative">
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="w-full max-w-[500px] md:max-w-none md:w-[37%] bg-[#fff3e3] p-5 md:p-8 lg:p-10 rounded-lg md:relative md:left-[15%]">
            <div>
              <h3 className="text-black text-xs md:text-sm">New Arrival</h3>
              <h1 className="text-[#b88e2f] text-2xl md:text-4xl lg:text-5xl font-bold mt-2 mb-3">
                Discover Our <br />
                New Collection
              </h1>
              <p className="text-sm md:text-base lg:text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis.
              </p>
            </div>
            <div className="mt-4 md:mt-6">
              <button className="bg-[#b88e2f] py-2 md:py-3 px-6 md:px-8 text-white rounded-sm text-sm font-bold hover:bg-[#9c7827] transition-colors">
                BUY NOW
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Browse Range Section */}
      <div className="w-full px-4 md:px-8 lg:px-40 mt-10 md:mt-28">
        <div className="text-center">
          <h1 className="text-xl md:text-3xl font-bold mb-3">Browse The Range</h1>
          <p className="text-sm md:text-base text-gray-600 max-w-md mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi iste
            fugit delectus dolorum ipsam?
          </p>
        </div>

        <div className="mt-8 md:mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {["Dining", "Living", "Bedroom"].map((room) => (
              <div key={room} className="group cursor-pointer">
                <div className="overflow-hidden rounded-lg h-[250px] md:h-[350px] lg:h-[450px]">
                  <img
                    src={`./assets/${room}.png`}
                    alt={room}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mt-3 text-center text-[#333]">
                  {room}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Products Section */}
        <Products />
        <div className="flex justify-center mb-32">
          <button className="px-8 md:px-12 py-2.5 border border-[#B88E2F] text-[#B88E2F] hover:bg-[#B88E2F] hover:text-white focus:bg-[#B88E2F] focus:text-white transition-colors duration-300 text-sm md:text-base ">
            Show More
          </button>
        </div>
      </div>

      {/* Room Inspiration Section */}
      <div className="w-full bg-[#FCF8F3] py-10 md:py-16">
        <div className="px-4 md:px-8 lg:px-56 ">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10">
            {/* Left Content */}
            <div className="w-full lg:w-[35%] text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#3A3A3A] mb-4">
                50+ Beautiful rooms <br />
                inspiration
              </h2>
              <p className="text-[#616161] text-sm md:text-base mb-6 max-w-md mx-auto lg:mx-0">
                Our designer already made a lot of beautiful prototipe of
                rooms that inspire you
              </p>
              <button className="bg-[#B88E2F] text-white px-6 py-2.5 md:py-3 flex items-center gap-2 hover:bg-[#967524] transition-colors mx-auto lg:mx-0 text-sm md:text-base">
                Explore More
              </button>
            </div>

            {/* Right Slider */}
            <div className="w-full lg:w-[65%] overflow-hidden mt-8 lg:mt-0">
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-8">
                {/* Main Card */}
                <div className="min-w-[280px] md:min-w-[350px] lg:min-w-[404px] shrink-0">
                  <div className="relative h-[300px] md:h-[400px] lg:h-[460px]">
                    <img
                      src="./assets/scroll1.png"
                      alt="Bed Room"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className=" w-[255px] h-[150px] absolute bottom-4 md:bottom-6 left-4 right-4 bg-white p-3 md:p-4 rounded opacity-80">
                      <div className="flex justify-center items-center gap-2 mt-5 mb-1 md:mb-2">
                        <span className="text-[#B88E2F] font-bold text-sm md:text-base">01</span>
                        <span className="text-[#616161]">---</span>
                        <span className="text-[#616161] text-sm md:text-xl">Bed Room</span>
                      </div>
                      <h3 className="flex justify-center items-center text-lg md:text-2xl font-bold text-[#3A3A3A]">
                        Inner Peace
                      </h3>
                      <button className="absolute right-3 md:left-64 top-32 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-[#B88E2F] flex items-center justify-center">
                        <ArrowForwardIcon className="text-white text-xl" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Additional Cards with reduced opacity */}
                <div className="min-w-[260px] md:min-w-[320px] shrink-0 opacity-60">
                  <div className="h-[280px] md:h-[390px]">
                    <img
                      src="./assets/scroll2.png"
                      alt="Living Room"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
                <div className="min-w-[260px] md:min-w-[320px] shrink-0 opacity-60">
                  <div className="h-[280px] md:h-[390px]">
                    <img
                      src="./assets/Dining.png"
                      alt="Living Room"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>

                <div className="min-w-[240px] md:min-w-[300px] shrink-0 opacity-60">
                  <div className="h-[280px] md:h-[390px]">
                    <img
                      src="./assets/scroll1.png"
                      alt="Kitchen"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center items-center gap-4">
                {[1, 2, 3, 4].map((_, index) => (
                  <div key={index} className="relative bottom-5 left-2">
                    <button 
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === 0 
                          ? 'bg-[#B88E2F] scale-110 ring-4 ring-[#B88E2F]/20' 
                          : 'bg-[#D8D8D8] hover:bg-[#B88E2F]/60'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                    {index === 0 && (
                      <div className="absolute rounded-full animate-pulse bg-[#B88E2F]/10" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Setup Section */}
      <div className="px-4 md:px-8 lg:px-48 py-10 md:py-16">
        <div className="text-center mb-8 md:mb-12 mt-12">
          <p className="text-sm md:text-base text-[#616161] mb-2">
            Share your setup with
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#3A3A3A]">
            #FuniroFurniture
          </h2>
        </div>

        {/* Image Grid Layout */}
        <div className="grid grid-cols-4 gap-2 md:gap-4 h-[600px]">
          {/* Column 1 */}
          <div className="grid gap-2 md:gap-4">
            <div className="h-[240px] overflow-hidden rounded-lg">
              <img
                src="./assets/card1.png"
                alt="Setup"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="h-[320px] overflow-hidden rounded-lg">
              <img
                src="./assets/card2.png"
                alt="Setup"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Column 2 */}
          <div className="grid gap-2 md:gap-4">
            <div className="h-[400px] overflow-hidden rounded-lg">
              <img
                src="./assets/card3.png"
                alt="Setup"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="h-[160px] overflow-hidden rounded-lg">
              <img
                src="./assets/card4.png"
                alt="Setup"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Column 3 */}
          <div className="grid gap-2 md:gap-4">
            <div className="h-[280px] overflow-hidden rounded-lg">
              <img
                src="./assets/card5.png"
                alt="Setup"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="h-[280px] overflow-hidden rounded-lg">
              <img
                src="./assets/card6.png"
                alt="Setup"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Column 4 */}
          <div className="grid gap-2 md:gap-4">
            <div className="h-[320px] overflow-hidden rounded-lg">
              <img
                src="./assets/card7.png"
                alt="Setup"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="h-[240px] overflow-hidden rounded-lg">
              <img
                src="./assets/card8.png"
                alt="Setup"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
