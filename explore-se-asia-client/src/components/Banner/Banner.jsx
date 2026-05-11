
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className="w-full bg-gradient-sunset py-20">
            <div className="container mx-auto px-6 sm:px-16 lg:px-24 flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                        Explore the Beauty of Southeast Asia
                    </h2>
                    <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
                        From crystal-clear waters to ancient cultural sites, Southeast Asia offers a perfect blend of nature, history, and adventure. Discover hidden gems and breathtaking landscapes.
                    </p>
                    <Link to="/all-spots">
                        <button className="btn-adventure text-lg px-8 py-3 font-bold">
                            Explore Tourist Spots
                        </button>
                    </Link>
                </div>
                <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="card-adventure overflow-hidden group cursor-pointer">
                        <div className="relative h-40 overflow-hidden">
                            <img src="https://i.ibb.co.com/zTsyBLKK/islands-andaman-sea-thailand-11zon.webp" alt="Beach in Thailand" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/60 flex justify-center items-center">
                                <h3 className="text-lg sm:text-xl font-semibold text-white">Best Beaches</h3>
                            </div>
                        </div>
                    </div>
                    <div className="card-adventure overflow-hidden group cursor-pointer">
                        <div className="relative h-40 overflow-hidden">
                            <img src="https://i.ibb.co.com/mVyc0jKq/indonesia-11zon.webp" alt="Cultural Heritage" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/60 flex justify-center items-center">
                                <h3 className="text-lg sm:text-xl font-semibold text-white">Cultural Heritage</h3>
                            </div>
                        </div>
                    </div>
                    <div className="card-adventure overflow-hidden group cursor-pointer">
                        <div className="relative h-40 overflow-hidden">
                            <img src="https://i.ibb.co.com/DDkkTcVW/waterfall-1-11zon-1-11zon.webp" alt="Waterfall" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/60 flex justify-center items-center">
                                <h3 className="text-lg sm:text-xl font-semibold text-white">Hidden Gems</h3>
                            </div>
                        </div>
                    </div>
                    <div className="card-adventure overflow-hidden group cursor-pointer">
                        <div className="relative h-40 overflow-hidden">
                            <img src="https://i.ibb.co.com/3Yj12p13/landmark-urban-district-city-commercial-11zon.webp" alt="Urban Landmarks" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/60 flex justify-center items-center">
                                <h3 className="text-lg sm:text-xl font-semibold text-white">Urban Wonders</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
