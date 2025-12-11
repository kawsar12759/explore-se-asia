import { Link } from "react-router-dom";
import Banner from "../Banner/Banner";
import Featured from "../Featured/Featured";
import img1 from '../../assets/forest_119591.png'
import img2 from '../../assets/emerald-temple_4193505.png'
import img3 from '../../assets/man_11508976.png'

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <section className="bg-gray-50 py-24 px-8">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-teal-800 mb-8">
                        Embark on Your Southeast Asia Adventure
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
                        Southeast Asia is more than a destination—it's an experience. From serene beaches to bustling cities, from ancient traditions to modern wonders, every corner of this region offers something unique. Let us guide you to the most captivating spots, where memories are made, and new adventures await.
                    </p>
                    <div className="sm:flex justify-center gap-8 mb-8">
                        <div className="text-center mb-8 sm:mb-0">
                            <div className="flex justify-center">
                                <div className="bg-teal-800 w-36 h-36 text-white p-2 rounded-full mb-4">
                                    <img className="h-full w-full" src={img1} alt="" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-semibold text-teal-800 mb-2">Nature Escapes</h3>
                            <p className="text-gray-600">Discover tranquil beaches, dense jungles, and towering mountains, perfect for nature lovers and adventurers.</p>
                        </div>
                        <div className="text-center mb-8 sm:mb-0">
                            <div className="flex justify-center">
                                <div className="bg-teal-800 w-36 h-36 text-white p-2 rounded-full mb-4">
                                    <img className="h-full w-full" src={img2} alt="" />
                                </div>
                            </div>
                            
                            <h3 className="text-2xl font-semibold text-teal-800 mb-2">Cultural Richness</h3>
                            <p className="text-gray-600">Explore ancient temples, vibrant markets, and immerse yourself in the local traditions and festivals of Southeast Asia.</p>
                        </div>
                        <div className="text-center mb-8 sm:mb-0">
                            <div className="flex justify-center">
                                <div className="bg-teal-800 w-36 h-36 text-white p-2 rounded-full mb-4">
                                    <img className="h-full w-full" src={img3} alt="" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-semibold text-teal-800 mb-2">Adventurous Journeys</h3>
                            <p className="text-gray-600">From thrilling hikes to water sports and more, Southeast Asia is a paradise for the adventurous traveler.</p>
                        </div>
                    </div>
                    <Link to="/all-spots">
                        <button className="bg-teal-800 hover:bg-teal-700 text-white py-3 px-8 rounded-full transition-all duration-300 shadow-lg">
                            Start Exploring Now
                        </button>
                    </Link>
                </div>
            </section>


            <Featured></Featured>
        </div>
    );
};

export default Home;