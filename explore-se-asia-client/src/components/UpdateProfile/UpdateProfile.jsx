import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from 'sweetalert2'

const UpdateProfile = () => {
    const { user, profileUpdate } = useContext(AuthContext);
    const handleUpdateProfile = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photourl.value;

        profileUpdate(name, photo)
            .then(() => {
                // Profile successfully updated
                // You may want to add a success message here

                Swal.fire({
                    title: 'Success!',
                    text: 'User Profile Updated Successfully',
                    icon: 'success',
                    confirmButtonText: 'Okay'
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    });

            })
            .catch(error => {
                // An error occurred
                // You may want to add an error message here
                console.error(error);
            });
    };
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-10 px-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center mb-2">Update Your Profile</h1>
            <p className="mb-8">Manage your personal details to keep your profile up-to-date.</p>
            <img className="h-32 w-32" src={user.photoURL} alt="" />
            <p className="text-xl font-bold text-gray-800 mb-6 text-center mb-5">{user.displayName}</p>
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">

                <form onSubmit={handleUpdateProfile}>
                    {/* Name Field */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            defaultValue={user.displayName}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#87CEEB]"
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            defaultValue={user.email}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#87CEEB] bg-[#e5e5e5]"
                            required
                        />
                    </div>
                    {/* Photo URL Field */}
                    <div className="mb-6">
                        <label htmlFor="photo-url" className="block text-gray-700 text-sm font-semibold mb-2">Photo URL</label>
                        <input
                            type="url"
                            id="photo-url"
                            name="photourl"
                            defaultValue={user.photoURL}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#87CEEB]"
                            placeholder="https://example.com/photo.jpg"
                        />
                    </div>



                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#00BFFF] text-white py-2 rounded-lg font-semibold hover:bg-[#4169E1]"
                    >
                        Update Profile
                    </button>
                </form>


            </div>
        </div>
    );
};

export default UpdateProfile;