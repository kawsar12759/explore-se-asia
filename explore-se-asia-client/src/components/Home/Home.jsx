import Banner from "../Banner/Banner";
import Featured from "../Featured/Featured";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <section className="bg-black py-16 px-8">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">Welcome to ExploreSEAsia</h2>
                    <p className="text-lg  text-white max-w-3xl mx-auto">
                        Southeast Asia is a region of rich cultural diversity, stunning landscapes, and unforgettable experiences. From ancient temples and bustling markets to pristine beaches and lush jungles, ExploreSEAsia is your gateway to discovering the best that this enchanting part of the world has to offer.
                    </p>
                </div>
            </section>
            <Featured></Featured>
        </div>
    );
};

export default Home;