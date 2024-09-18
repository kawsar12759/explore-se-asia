import { useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../providers/AuthProvider";
import Swal from 'sweetalert2'
const AddSpot = () => {
    const { user } = useContext(AuthContext);
    const handleAddTouristSpot = e => {
        e.preventDefault();
        const spotName = e.target.touristsSpotName.value;
        const country = e.target.countryName.value;
        const location = e.target.location.value;
        const image = e.target.imageUrl.value;
        const description = e.target.shortDescription.value;
        const totalVisitors = e.target.totalVisitorsPerYear.value;
        const seasonality = e.target.seasonality.value;
        const averageCost = e.target.averageCost.value;
        const travelDuration = e.target.travelDuration.value;
        const userName = e.target.userName.value;
        const userEmail = e.target.userEmail.value;
        if (!/^https?:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(?:\/[^\s]*)?\.(?:jpg|jpeg|png|gif|bmp|webp)$/.test(image)) {
            toast.warning('Provide a valid Photo URL');
            return;
        }
        else if(description.length<25){
            toast.warning('Description must contain at least 25 characters');
            return;
        }
        const newSpot = { spotName, country, location, image, description, totalVisitors, seasonality, averageCost, travelDuration, userName, userEmail };

        fetch('http://localhost:5000/spots', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newSpot)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Tourist Spot Added',
                        icon: 'success',
                        confirmButtonText: 'Okay'
                    })
                    e.target.reset();
                }
            })

    }
    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center py-10 px-6"
            style={{ backgroundImage: "url('https://i.ibb.co.com/4J5LWvG/pexels-pixabay-38238.jpg')" }}  // Add your background image URL here
        >
            <ToastContainer />
            <div className="bg-white bg-opacity-80 shadow-xl rounded-xl p-10 max-w-3xl w-full">
                <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">Add a New Tourist Spot</h2>
                <form className="space-y-6" onSubmit={handleAddTouristSpot}>
                    {/* Tourist Spot Name Field */}
                    <div>
                        <label htmlFor="touristsSpotName" className="block text-lg font-medium text-gray-700 mb-1">Tourist Spot Name</label>
                        <input
                            type="text"
                            id="touristsSpotName"
                            name="touristsSpotName"
                            className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-300"
                            required
                        />
                    </div>
                    <div className="flex">
                        {/* Country Name Field */}
                        <div className="w-1/2 mr-5">
                            <label htmlFor="countryName" className="block text-lg font-medium text-gray-700 mb-1">Country Name</label>
                            <input
                                type="text"
                                id="countryName"
                                name="countryName"
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-300"
                                required
                            />
                        </div>

                        {/* Location Field */}
                        <div className="w-1/2">
                            <label htmlFor="location" className="block text-lg font-medium text-gray-700 mb-1">Location</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-300"
                                required
                            />
                        </div>




                    </div>
                    {/* Image URL Field */}
                    <div>
                        <label htmlFor="imageUrl" className="block text-lg font-medium text-gray-700 mb-1">Image URL</label>
                        <input
                            type="url"
                            id="imageUrl"
                            name="imageUrl"
                            className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-300"
                            placeholder="https://example.com/image.jpg"
                            required
                        />
                    </div>


                    {/* Short Description Field */}
                    <div>
                        <label htmlFor="shortDescription" className="block text-lg font-medium text-gray-700 mb-1">Short Description</label>
                        <textarea
                            id="shortDescription"
                            name="shortDescription"
                            className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-300"
                            rows="3"
                            placeholder="Describe the tourist spot in a few words..."
                            required
                        />
                    </div>
                    <div className="flex">
                        {/* Total Visitors Per Year Field */}
                        <div className="w-1/2 mr-5">
                            <label htmlFor="totalVisitorsPerYear" className="block text-lg font-medium text-gray-700 mb-1">Total Visitors Per Year</label>
                            <input
                                type="number"
                                id="totalVisitorsPerYear"
                                name="totalVisitorsPerYear"
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-300"
                                placeholder="e.g. 10000"
                                required
                            />
                        </div>


                        {/* Seasonality Field */}
                        <div className="w-1/2">
                            <label htmlFor="seasonality" className="block text-lg font-medium text-gray-700 mb-1">Seasonality</label>
                            <select
                                id="seasonality"
                                name="seasonality"
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-300"
                                required
                            >
                                <option value="">Select Seasonality</option>
                                <option value="Summer">Summer</option>
                                <option value="Winter">Winter</option>
                                <option value="Year Round">Year Round</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex">
                        {/* Average Cost Field */}
                        <div className="w-1/2 mr-5">
                            <label htmlFor="averageCost" className="block text-lg font-medium text-gray-700 mb-1">Average Cost</label>
                            <input
                                type="number"
                                id="averageCost"
                                name="averageCost"
                                placeholder="In USD ($)"
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-300"
                                required
                            />
                        </div>



                        {/* Travel Time Field */}
                        <div className="w-1/2">
                            <label htmlFor="travelDuration" className="block text-lg font-medium text-gray-700 mb-1">Travel Duration</label>
                            <input
                                type="number"
                                id="travelDuration"
                                name="travelDuration"
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-300"
                                placeholder="In Days"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex">
                        {/* User Name Field */}
                        <div className="w-1/2 mr-5">
                            <label htmlFor="userName" className="block text-lg font-medium text-gray-700 mb-1">Your Name</label>
                            <input
                                type="text"
                                id="userName"
                                name="userName"
                                defaultValue={user.displayName}
                                readOnly
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-300 bg-[#e5e5e5]"
                                required
                            />
                        </div>


                        {/* User Email Field */}
                        <div className="w-1/2">
                            <label htmlFor="userEmail" className="block text-lg font-medium text-gray-700 mb-1">Your Email</label>
                            <input
                                type="email"
                                id="userEmail"
                                name="userEmail"
                                defaultValue={user.email}
                                readOnly
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-300 bg-[#e5e5e5]"
                                required
                            />
                        </div>


                    </div>
                    {/* Add Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-[#00BFFF] hover:bg-[#009ACD] text-white py-3 px-6 rounded-full font-semibold text-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 "
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