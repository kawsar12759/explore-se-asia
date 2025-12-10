
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className="w-full bg-gradient-to-r from-teal-900 via-teal-700 to-emerald-800 py-20">
            <div className="container mx-auto px-6 sm:px-16 lg:px-24 flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                    <h2 className="text-4xl sm:text-5xl font-semibold text-white mb-6">
                        Explore the Beauty of Southeast Asia
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed">
                        From crystal-clear waters to ancient cultural sites, Southeast Asia offers a perfect blend of nature, history, and adventure. Discover hidden gems and breathtaking landscapes.
                    </p>
                    <Link to="/all-spots">
                        <button className="bg-[#008080] text-white py-3 px-8 rounded-full hover:bg-[#006666] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                            Explore Tourist Spots
                        </button>
                    </Link>
                </div>
                <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-[#f3f8f6] cursor-pointer">
                        <div className="relative">
                            <img src="https://i.ibb.co.com/zTsyBLKK/islands-andaman-sea-thailand-11zon.webp" alt="Beach in Thailand" className="w-full h-40 object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/60 flex justify-center items-center text-center text-white">
                                <h3 className="text-lg sm:text-xl font-semibold">Best Beaches</h3>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-[#f3f8f6] cursor-pointer">
                        <div className="relative">
                            <img src="https://i.ibb.co.com/mVyc0jKq/indonesia-11zon.webp" alt="Cultural Heritage" className="w-full h-40 object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/60 flex justify-center items-center text-center text-white">
                                <h3 className="text-lg sm:text-xl font-semibold">Cultural Heritage</h3>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-[#f3f8f6] cursor-pointer">
                        <div className="relative">
                            <img src="https://i.ibb.co.com/DDkkTcVW/waterfall-1-11zon-1-11zon.webp" alt="Waterfall" className="w-full h-40 object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/60 flex justify-center items-center text-center text-white">
                                <h3 className="text-lg sm:text-xl font-semibold">Hidden Gems</h3>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-[#f3f8f6] cursor-pointer">
                        <div className="relative">
                            <img src="https://i.ibb.co.com/3Yj12p13/landmark-urban-district-city-commercial-11zon.webp" alt="Urban Landmarks" className="w-full h-40 object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/60 flex justify-center items-center text-center text-white">
                                <h3 className="text-lg sm:text-xl font-semibold">Urban Wonders</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
