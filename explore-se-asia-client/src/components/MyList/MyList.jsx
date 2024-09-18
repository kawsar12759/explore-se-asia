import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
const MyList = () => {
    const { user } = useContext(AuthContext);
    const [myAddedSpot, setMyAddedSpot] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/spots/byuser/${user.email}`)
            .then(res => res.json())
            .then(data => setMyAddedSpot(data));

    }, [])

    const handleDeleteSpot = id => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
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
                            const remaining = myAddedSpot.filter(user => user._id !== id);
                            setMyAddedSpot(remaining);
                        }
                    })

            }
        });
    }


    return (
        <div className='px-10'>
            {myAddedSpot.length > 0 ? <div className='container  py-12  mx-auto'>
                <h1 className='text-3xl font-semibold text-center'>Your Added Tourist Spot/s</h1>
                <div className="overflow-x-auto">
                    <table className="table table-lg mt-12">
                        {/* head */}
                        <thead>
                            <tr className='text-xl'>

                                <th>Spot Image</th>
                                <th>Spot Name</th>
                                <th>Loction</th>
                                <th>Travel Season</th>
                                <th className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myAddedSpot.map(spot => (<>
                                <tr>

                                    <td className='min-w-48 w-80'><img className='w-80 h-32 lg:h-52' src={spot.image} alt={spot.spotName} /></td>
                                    <td className='text-md lg:text-xl font-medium min-w-32'>{spot.spotName}</td>
                                    <td>{spot.location}, {spot.country}</td>
                                    <td>{spot.seasonality}</td>
                                    <td className='text-center'><div className='lg:flex lg:justify-center'>
                                        <div ><Link to={`/update-spot/${spot._id}`}><button className='btn mb-3 lg:mb-0 lg:mr-3'><FiEdit className='text-xl font-bold text-green-500' /></button></Link></div><div><button className='btn' onClick={() => handleDeleteSpot(spot._id)}><RiDeleteBin6Line className='text-xl font-bold text-green-500' /></button></div></div></td>
                                </tr></>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div> : <div className=' min-h-screen flex justify-center items-center'><div><p className='text-center text-3xl font-semibold mb-7'>You haven't added any tourist Spot yet!</p>
                <div className='flex justify-center'><Link to='/add-spot'><button className='btn bg-[#228B22] text-white hover:bg-[#1e771e]'>Add Spot</button></Link></div></div></div>}
        </div>
    );
};

export default MyList;