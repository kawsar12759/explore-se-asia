import { Link } from "react-router-dom";
import Banner from "../Banner/Banner";
import Featured from "../Featured/Featured";
import { FiMapPin, FiCompass, FiCamera } from "react-icons/fi";
import img1 from '../../assets/forest_119591.png'
import img2 from '../../assets/emerald-temple_4193505.png'
import img3 from '../../assets/man_11508976.png'

const Home = () => {
    return (
        <div className="bg-white">
            <Banner></Banner>

            {/* Features Section */}
            <section className="py-16 sm:py-24 px-4 sm:px-8 bg-gradient-to-b from-white to-adventure-50">
                <div className="container mx-auto">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-3xl sm:text-5xl font-bold mb-4">
                            <span className="text-adventure-gradient">Embark on Your</span>
                            <br />
                            Southeast Asia Adventure
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Southeast Asia is more than a destination—it's an experience. From serene beaches to bustling cities, from ancient traditions to modern wonders, every corner of this region offers something unique.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
                        {/* Feature 1 */}
                        <div className="card-adventure p-8 text-center group">
                            <div className="flex justify-center mb-4">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-adventure flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300">
                                    <FiMapPin className="text-4xl text-white" />
                                </div>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-adventure-600 mb-3">Nature Escapes</h3>
                            <p className="text-gray-600 text-sm sm:text-base">Discover tranquil beaches, dense jungles, and towering mountains perfect for nature lovers and adventurers.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="card-adventure p-8 text-center group">
                            <div className="flex justify-center mb-4">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-amber-400 to-adventure-500 flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300">
                                    <span className="text-4xl">🏛️</span>
                                </div>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-adventure-600 mb-3">Cultural Richness</h3>
                            <p className="text-gray-600 text-sm sm:text-base">Explore ancient temples, vibrant markets, and immerse yourself in local traditions and festivals.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="card-adventure p-8 text-center group">
                            <div className="flex justify-center mb-4">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300">
                                    <FiCompass className="text-4xl text-white" />
                                </div>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-adventure-600 mb-3">Adventurous Journeys</h3>
                            <p className="text-gray-600 text-sm sm:text-base">From thrilling hikes to water sports and more, Southeast Asia is a paradise for adventurous travelers.</p>
                        </div>
                    </div>

                    <div className="text-center">
                        <Link to="/all-spots">
                            <button className="btn-adventure text-lg px-8 py-3 sm:px-10 sm:py-4 font-bold transition-all duration-300">
                                <FiMapPin className="text-xl" /> Start Exploring Now
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Spots Section */}
            <section className="py-16 sm:py-24 px-4 sm:px-8 bg-white">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            <span className="text-adventure-gradient">Featured Destinations</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Discover the most sought-after and highly-rated travel spots across Southeast Asia
                        </p>
                    </div>
                    <Featured></Featured>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-16 sm:py-20 px-4 sm:px-8 bg-gradient-sunset rounded-3xl mx-4 sm:mx-8 mb-12 text-white">
                <div className="container mx-auto text-center">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Share Your Hidden Gems?</h3>
                    <p className="text-base sm:text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                        Have you discovered an amazing spot in Southeast Asia? Share it with our community!
                    </p>
                    <Link to="/add-spot">
                        <button className="btn bg-white text-adventure-600 hover:bg-gray-100 border-none px-8 py-3 font-bold rounded-lg">
                            <span className="text-xl">✨</span> Add Your Spot
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;