import Banner from "../Banner/Banner";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <section className="bg-white py-16 px-8">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome to ExploreSEAsia</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Southeast Asia is a region of rich cultural diversity, stunning landscapes, and unforgettable experiences. From ancient temples and bustling markets to pristine beaches and lush jungles, ExploreSEAsia is your gateway to discovering the best that this enchanting part of the world has to offer.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;