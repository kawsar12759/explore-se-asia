import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { FiEdit, FiTrash2, FiHeart } from "react-icons/fi";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';

const MyList = () => {
    const { user } = useContext(AuthContext);
    const [myAddedSpots, setMyAddedSpots] = useState([]);
    const [myWishlists, setMyWishlists] = useState([]);
    const [activeTab, setActiveTab] = useState('added');

    useEffect(() => {
        if (user?.email) {
            fetchMySpots();
            fetchWishlists();
        }
    }, [user?.email])

    const fetchMySpots = () => {
        fetch(`http://localhost:5000/spots/byuser/${user.email}`)
            .then(res => res.json())
            .then(data => setMyAddedSpots(data))
            .catch(err => console.error(err));
    }

    const fetchWishlists = () => {
        fetch(`http://localhost:5000/wishlists/user/${user.email}`)
            .then(res => res.json())
            .then(data => setMyWishlists(data))
            .catch(err => console.error(err));
    }

    const handleDeleteSpot = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#f26c28",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/spots/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "The spot has been deleted.",
                                icon: "success"
                            });
                            const remaining = myAddedSpots.filter(spot => spot._id !== id);
                            setMyAddedSpots(remaining);
                        }
                    })
            }
        });
    }

    const handleDeleteWishlist = id => {
        Swal.fire({
            title: "Remove from Wishlist?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#f26c28",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/wishlists/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            const remaining = myWishlists.filter(item => item._id !== id);
                            setMyWishlists(remaining);
                            toast.success("Removed from wishlist!");
                        }
                    })
            }
        });
    }

    return (
        <div className='min-h-screen bg-white'>
            <div className='px-4 sm:px-8 py-8 sm:py-12'>
                <div className='max-w-6xl mx-auto'>
                    <h1 className='text-3xl sm:text-4xl font-bold text-adventure-600 text-center mb-8'>
                        My Travel Collection
                    </h1>

                    {/* Tabs */}
                    <div className='flex gap-4 mb-8 border-b-2 border-adventure-100'>
                        <button
                            onClick={() => setActiveTab('added')}
                            className={`px-6 py-3 font-semibold transition-all duration-200 ${
                                activeTab === 'added'
                                    ? 'border-b-4 border-adventure-600 text-adventure-600'
                                    : 'text-gray-600 hover:text-adventure-600'
                            }`}
                        >
                            My Added Spots ({myAddedSpots.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('wishlist')}
                            className={`px-6 py-3 font-semibold transition-all duration-200 flex items-center gap-2 ${
                                activeTab === 'wishlist'
                                    ? 'border-b-4 border-adventure-600 text-adventure-600'
                                    : 'text-gray-600 hover:text-adventure-600'
                            }`}
                        >
                            <FiHeart /> My Wishlist ({myWishlists.length})
                        </button>
                    </div>

                    {/* Added Spots Tab */}
                    {activeTab === 'added' && (
                        <div>
                            {myAddedSpots.length > 0 ? (
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                    {myAddedSpots.map(spot => (
                                        <div key={spot._id} className='card-adventure overflow-hidden'>
                                            <div className='relative overflow-hidden h-48'>
                                                <img
                                                    src={spot.image}
                                                    alt={spot.spotName}
                                                    className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
                                                />
                                            </div>
                                            <div className='p-6'>
                                                <h3 className='text-lg font-bold text-gray-800 mb-2'>{spot.spotName}</h3>
                                                <p className='text-sm text-gray-600 mb-4'>
                                                    {spot.location}, {spot.country}
                                                </p>
                                                <p className='text-xs text-gray-500 mb-4'>
                                                    Season: <span className='font-semibold'>{spot.seasonality}</span>
                                                </p>
                                                <div className='flex gap-3'>
                                                    <Link to={`/update-spot/${spot._id}`} className='flex-1'>
                                                        <button className='w-full btn btn-sm bg-gradient-adventure text-white border-none rounded-lg hover:shadow-lg'>
                                                            <FiEdit /> Edit
                                                        </button>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDeleteSpot(spot._id)}
                                                        className='btn btn-sm btn-outline border-red-500 text-red-500 hover:bg-red-50 rounded-lg'
                                                    >
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className='text-center py-16'>
                                    <p className='text-xl text-gray-600 mb-6'>
                                        You haven't added any spots yet!
                                    </p>
                                    <Link to='/add-spot'>
                                        <button className='btn-adventure text-lg px-8 py-3'>
                                            Add Your First Spot
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Wishlist Tab */}
                    {activeTab === 'wishlist' && (
                        <div>
                            {myWishlists.length > 0 ? (
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                    {myWishlists.map(item => (
                                        <div key={item._id} className='card-adventure overflow-hidden'>
                                            <div className='relative overflow-hidden h-48'>
                                                <img
                                                    src={item.image}
                                                    alt={item.spotName}
                                                    className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
                                                />
                                                <div className='absolute top-3 right-3'>
                                                    <div className='bg-red-500 text-white rounded-full p-2'>
                                                        <FiHeart className='text-lg fill-current' />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='p-6'>
                                                <h3 className='text-lg font-bold text-gray-800 mb-2'>{item.spotName}</h3>
                                                <p className='text-sm text-gray-600 mb-4'>
                                                    {item.country}
                                                </p>
                                                <p className='text-xs text-gray-500 mb-4'>
                                                    Added: {new Date(item.addedAt).toLocaleDateString()}
                                                </p>
                                                <div className='flex gap-3'>
                                                    <Link to={`/spot-details/${item.spotId}`} className='flex-1'>
                                                        <button className='w-full btn btn-sm bg-gradient-adventure text-white border-none rounded-lg hover:shadow-lg'>
                                                            View Details
                                                        </button>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDeleteWishlist(item._id)}
                                                        className='btn btn-sm btn-outline border-red-500 text-red-500 hover:bg-red-50 rounded-lg'
                                                    >
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className='text-center py-16'>
                                    <p className='text-xl text-gray-600 mb-6'>
                                        Your wishlist is empty!
                                    </p>
                                    <Link to='/all-spots'>
                                        <button className='btn-adventure text-lg px-8 py-3'>
                                            Explore and Wishlist Spots
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyList;