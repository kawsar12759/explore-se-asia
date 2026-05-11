import { useContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../providers/AuthProvider";
import Swal from 'sweetalert2';

const AddSpot = () => {
    const { user } = useContext(AuthContext);
    const [thumbnail, setThumbnail] = useState(null);
    const [images, setImages] = useState([]);
    const handleAddTouristSpot = e => {
        e.preventDefault();
        const spotName = e.target.touristsSpotName.value;
        const country = e.target.countryName.value;
        const location = e.target.location.value;
        const description = e.target.shortDescription.value;
        const totalVisitors = e.target.totalVisitorsPerYear.value;
        const seasonality = e.target.seasonality.value;
        const averageCost = e.target.averageCost.value;
        const travelDuration = e.target.travelDuration.value;
        const userName = e.target.userName.value;
        const userEmail = e.target.userEmail.value;
        const address = e.target.address.value;

        if (!thumbnail) {
            toast.warning('Please provide a thumbnail/banner image');
            return;
        }
        if (images.length === 0) {
            toast.warning('Please provide at least one view image');
            return;
        }

        if (description.length < 25) {
            toast.warning('Description must contain at least 25 characters');
            return;
        }

        const newSpot = {
            spotName, country, location, description, totalVisitors, seasonality,
            averageCost, travelDuration, userName, userEmail,
            address, thumbnail, images
        };

        fetch('https://explore-se-asia-server.vercel.app/spots', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newSpot)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Tourist Spot Added',
                        icon: 'success',
                        confirmButtonText: 'Okay'
                    });
                    e.target.reset();
                    setThumbnail(null);
                    setImages([]);
                }
            })
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnail(URL.createObjectURL(file));
        }
    };

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setImages(files.map(file => URL.createObjectURL(file)));
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center py-10 px-6"
            style={{ backgroundImage: "url('https://i.ibb.co.com/4J5LWvG/pexels-pixabay-38238.jpg')" }}
        >
            <ToastContainer />
            <div className="bg-white bg-opacity-90 shadow-2xl rounded-2xl p-10 max-w-3xl w-full">
                <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-adventure-gradient mb-8 text-center">Add a New Tourist Spot</h2>
                <form className="space-y-6" onSubmit={handleAddTouristSpot}>
                    <div>
                        <label htmlFor="touristsSpotName" className="block text-lg font-medium text-gray-700 mb-1">Tourist Spot Name</label>
                        <input
                            type="text"
                            id="touristsSpotName"
                            name="touristsSpotName"
                            placeholder="Enter Tourist Spot Name"
                            className="w-full px-5 py-3 border-2 border-adventure-200 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-adventure-500 bg-white"
                            required
                        />
                    </div>
                    <div className="sm:flex">
                        <div className="sm:w-1/2 mb-6 sm:mb-0 sm:mr-5">
                            <label htmlFor="countryName" className="block text-lg font-medium text-gray-700 mb-1">Country Name</label>
                            <input
                                type="text"
                                id="countryName"
                                name="countryName"
                                placeholder="Enter Country Name"
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-teal-400 bg-white"
                                required
                            />
                        </div>

                        <div className="sm:w-1/2">
                            <label htmlFor="location" className="block text-lg font-medium text-gray-700 mb-1">Location</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                placeholder="Enter Location"
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-teal-400 bg-white"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="thumbnail" className="block text-lg font-medium text-gray-700 mb-1">Thumbnail / Banner Image</label>
                        <input
                            type="file"
                            id="thumbnail"
                            name="thumbnail"
                            accept="image/*"
                            onChange={handleThumbnailChange}
                            className="w-full px-5 py-3 border-2 border-adventure-200 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-adventure-500 bg-white"
                            required
                        />
                        {thumbnail && <img src={thumbnail} alt="Thumbnail Preview" className="mt-3 w-full h-48 object-cover rounded-lg" />}
                    </div>
                    <div>
                        <label htmlFor="images" className="block text-lg font-medium text-gray-700 mb-1">Additional Images (Multiple)</label>
                        <input
                            type="file"
                            id="images"
                            name="images"
                            accept="image/*"
                            multiple
                            onChange={handleImagesChange}
                            className="w-full px-5 py-3 border-2 border-adventure-200 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-adventure-500 bg-white"
                            required
                        />
                        {images.length > 0 && (
                            <div className="mt-3 grid grid-cols-3 gap-3">
                                {images.map((img, index) => (
                                    <img key={index} src={img} alt={`Preview ${index}`} className="w-full h-32 object-cover rounded-lg" />
                                ))}
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="shortDescription" className="block text-lg font-medium text-gray-700 mb-1">Short Description</label>
                        <textarea
                            id="shortDescription"
                            name="shortDescription"
                            className="w-full px-5 py-3 border-2 border-adventure-200 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-adventure-500 bg-white"
                            rows="3"
                            placeholder="Describe the tourist spot in a few words..."
                            required
                        />
                    </div>
                    <div className="sm:flex">
                        <div className="sm:w-1/2 sm:mr-5 mb-6 sm:mb-0">
                            <label htmlFor="totalVisitorsPerYear" className="block text-lg font-medium text-gray-700 mb-1">Total Visitors Per Year</label>
                            <input
                                type="number"
                                id="totalVisitorsPerYear"
                                name="totalVisitorsPerYear"
                                className="w-full px-5 py-3 border-2 border-adventure-200 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-adventure-500 bg-white"
                                placeholder="e.g. 10000"
                                required
                            />
                        </div>

                        <div className="sm:w-1/2">
                            <label htmlFor="seasonality" className="block text-lg font-medium text-gray-700 mb-1">Seasonality</label>
                            <select
                                id="seasonality"
                                name="seasonality"
                                className="w-full px-5 py-3 border-2 border-adventure-200 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-adventure-500 bg-white"
                                required
                            >
                                <option value="">Select Seasonality</option>
                                <option value="Summer">Summer</option>
                                <option value="Winter">Winter</option>
                                <option value="Year Round">Year Round</option>
                            </select>
                        </div>
                    </div>

                    <div className="sm:flex">
                        <div className="sm:w-1/2 sm:mr-5 mb-6 sm:mb-0">
                            <label htmlFor="averageCost" className="block text-lg font-medium text-gray-700 mb-1">Average Cost</label>
                            <input
                                type="number"
                                id="averageCost"
                                name="averageCost"
                                placeholder="In USD ($)"
                                className="w-full px-5 py-3 border-2 border-adventure-200 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-adventure-500 bg-white"
                                required
                            />
                        </div>

                        <div className="sm:w-1/2">
                            <label htmlFor="travelDuration" className="block text-lg font-medium text-gray-700 mb-1">Travel Duration</label>
                            <input
                                type="number"
                                id="travelDuration"
                                name="travelDuration"
                                className="w-full px-5 py-3 border-2 border-adventure-200 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-adventure-500 bg-white"
                                placeholder="In Days"
                                required
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="btn-adventure text-lg px-8 py-3 font-bold"
                        >
                            Add Tourist Spot
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSpot;
