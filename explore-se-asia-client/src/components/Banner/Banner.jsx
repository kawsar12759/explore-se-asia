import carouselImg1 from '../../assets/islands-andaman-sea-thailand.jpg'
import carouselImg2 from '../../assets/indonesia.jpg'

import carouselImg3 from '../../assets/waterfall.jpg'
import carouselImg4 from '../../assets/landmark-urban-district-city-commercial.jpg'

const Banner = () => {
    return (
        <div>
            <div className="carousel w-full">
                <div id="slide1" className="carousel-item relative w-full">
                    <img style={{ height: '700px' }}
                        src={carouselImg1}
                        className="w-full" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end px-16 md:px-32 lg:px-48 py-8 bg-gradient-to-b from-transparent to-gray-900 bg-opacity-75">
                        <h2 className="text-4xl text-white font-bold text-center mb-5">Discover the Best Beaches in Southeast Asia</h2>
                        <p className="text-lg text-gray-200 mt-2 text-center mb-6">
                            From the crystal-clear waters of Thailand to the pristine, untouched sands of the Philippines, Southeast Asia's beaches offer breathtaking views, endless relaxation, and unforgettable sunsets. Whether you're looking to unwind or embark on a seaside adventure, your perfect beach getaway awaits.
                        </p>
                        <div className='flex justify-center font-medium'>
                            <button className="btn border-none bg-[#0D9488] text-white  py-3 px-5 rounded hover:bg-[#0F766E]">Explore Tourist Spots</button>
                        </div>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide4" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <img style={{ height: '700px' }}
                        src={carouselImg2}
                        className="w-full" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end px-16 md:px-32 lg:px-48 py-8 bg-gradient-to-b from-transparent to-gray-900 bg-opacity-75">
                        <h2 className="text-4xl text-white font-bold text-center mb-5">Experience the Rich Cultural Heritage of Southeast Asia</h2>
                        <p className="text-lg text-gray-200 mt-2 text-center mb-6">
                            Journey through the ancient temples of Cambodia, marvel at Indonesia's majestic monuments, and immerse yourself in centuries-old traditions that thrive in Southeast Asia's vibrant cultural landscape. Every destination offers a unique window into the history, spirituality, and creativity of this remarkable region.
                        </p>
                        <div className='flex justify-center font-medium'>
                            <button className="btn border-none bg-[#0D9488] text-white  py-3 px-5 rounded hover:bg-[#0F766E]">Explore Tourist Spots</button>
                        </div>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <img style={{ height: '700px' }}
                        src={carouselImg3}
                        className="w-full" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end px-16 md:px-32 lg:px-48 py-8 bg-gradient-to-b from-transparent to-gray-900 bg-opacity-75">
                        <h2 className="text-4xl text-white font-bold text-center mb-5">Explore Southeast Asia's Hidden Gems</h2>
                        <p className="text-lg text-gray-200 mt-2 text-center mb-6">
                            Step off the beaten path and uncover Southeast Asia's secret treasures. From secluded islands and untouched waterfalls to peaceful villages and remote landscapes, these hidden gems offer tranquility, beauty, and a chance to connect with nature and local cultures in a way few have experienced.
                        </p>
                        <div className='flex justify-center font-medium'>
                            <button className="btn border-none bg-[#0D9488] text-white  py-3 px-5 rounded hover:bg-[#0F766E]">Explore Tourist Spots</button>
                        </div>

                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide4" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide4" className="carousel-item relative w-full">
                    <img style={{ height: '700px' }}
                        src={carouselImg4}
                        className="w-full" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end px-16 md:px-32 lg:px-48 py-8 bg-gradient-to-b from-transparent to-gray-900 bg-opacity-75">
                        <h2 className="text-4xl text-white font-bold text-center mb-5">Discover the Best of Southeast Asian Cities</h2>
                        <p className="text-lg text-gray-200 mt-2 text-center mb-6">
                            From Singapore's iconic skyline and futuristic architecture to the vibrant street markets and historic sites of Kuala Lumpur and Bangkok, Southeast Asia’s cities are as diverse as they are exciting. Immerse yourself in the region’s dynamic urban cultures, where tradition meets modernity.
                        </p>
                        <div className='flex justify-center font-medium'>
                            <button className="btn border-none bg-[#0D9488] text-white  py-3 px-5 rounded hover:bg-[#0F766E]">Explore Tourist Spots</button>
                        </div>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Banner;