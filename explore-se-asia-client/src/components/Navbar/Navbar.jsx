import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import logo from '../../../public/logo.png'
const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [imageLoaded, setImageLoaded] = useState(false);
    const navigate = useNavigate();
    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/login', { state: { fromLogout: true } });

            }).catch((error) => {
                // An error happened.
            });
    }
    const handleError = () => {
        setImageLoaded(true);
    };
    const navLinks = <>
        <li><NavLink className={({ isActive }) => isActive ? "!bg-[#FFD700] !text-[#006400] hover:bg-[#FFD700] font-semibold hover:text-[#006400] active:!bg-[#20B2AA] active:!text-[#FFFFF0] visited:bg-[#FFD700] visited:text-[#006400]" : "active:!bg-[#20B2AA] active:!text-[#FFFFF0]"} to='/'>Home</NavLink></li>
        <li><NavLink className={({ isActive }) => isActive ? "!bg-[#FFD700] !text-[#006400] hover:bg-[#FFD700] font-semibold hover:text-[#006400] active:!bg-[#20B2AA] active:!text-[#FFFFF0] visited:bg-[#FFD700] visited:text-[#006400]" : "active:!bg-[#20B2AA] active:!text-[#FFFFF0]"} to='/all-spots'>All Spots</NavLink></li>
        {user && <>   <li><NavLink className={({ isActive }) => isActive ? "!bg-[#FFD700] !text-[#4d614d] hover:bg-[#FFD700] font-semibold hover:text-[#006400] active:!bg-[#20B2AA] active:!text-[#FFFFF0] visited:bg-[#FFD700] visited:text-[#006400]" : "active:!bg-[#20B2AA] active:!text-[#FFFFF0]"} to='/add-spot'>Add Spot</NavLink></li>
            <li><NavLink className={({ isActive }) => isActive ? "!bg-[#FFD700] !text-[#006400] hover:bg-[#FFD700] font-semibold hover:text-[#006400] active:!bg-[#20B2AA] active:!text-[#FFFFF0] visited:bg-[#FFD700] visited:text-[#006400]" : "active:!bg-[#20B2AA] active:!text-[#FFFFF0]"} to='/my-list'>My List</NavLink></li>
            <li className="inline-block sm:hidden"><NavLink className={({ isActive }) => isActive ? "!bg-[#FFD700] !text-[#006400] hover:bg-[#FFD700] font-semibold hover:text-[#006400] active:!bg-[#20B2AA] active:!text-[#FFFFF0] visited:bg-[#FFD700] visited:text-[#006400]" : "active:!bg-[#20B2AA] active:!text-[#FFFFF0]"} to='/update-profile'>{user.displayName}</NavLink></li>

        </>}
        {
            !user && <>
                <li className="inline-block xs:hidden"><NavLink className={({ isActive }) => isActive ? "!bg-[#FFD700] !text-[#006400] hover:bg-[#FFD700] font-semibold hover:text-[#006400] active:!bg-[#20B2AA] active:!text-[#FFFFF0] visited:bg-[#FFD700] visited:text-[#006400]" : "active:!bg-[#20B2AA] active:!text-[#FFFFF0]"} to='/login'>Login</NavLink></li>
                <li className="inline-block xs:hidden"><NavLink className={({ isActive }) => isActive ? "!bg-[#FFD700] !text-[#006400] hover:bg-[#FFD700] font-semibold hover:text-[#006400] active:!bg-[#20B2AA] active:!text-[#FFFFF0] visited:bg-[#FFD700] visited:text-[#006400]" : "active:!bg-[#20B2AA] active:!text-[#FFFFF0]"} to='/register'>Register</NavLink></li>

            </>
        }

    </>
    return (
        <div className="sticky bg-[#008080] top-0 z-50 shadow-md">
            <div className="navbar px-4 sm:px-16 mx-auto text-white ">
                <div className="navbar-start">
                    <div className="dropdown ">
                        <div tabIndex={0} role="button" className="btn btn-ghost  xl:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content !bg-[#008080] opacity-75 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {
                                navLinks
                            }
                        </ul>
                    </div>
                    <Link to='/' className="text-lg sm:text-2xl font-medium flex items-center">
                        <img className="h-5 w-5 sm:h-8 sm:w-8 mr-2" src={logo} alt="" />
                        ExploreSEAsia</Link>
                </div>
                <div className="navbar-center hidden xl:flex font-medium">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user && <><Link to='update-profile' className="btn btn-ghost">
                        <p className="hidden md:block text-lg mr-4">{user.displayName}</p>
                        <div className="">
                            <img className="w-12 h-12 rounded-full hidden sm:inline-block"
                                alt={user.displayName}
                                src={imageLoaded ? "https://i.ibb.co.com/St8w19S/user.png" : user.photoURL}
                                onError={handleError} />
                        </div></Link></>}
                    {user ?
                        <button onClick={handleLogOut} className="btn bg-[#FF4500] text-[#FFFFFF] hover:bg-[#FF6347] border-none px-4 sm:px-6 py-1 sm:py-2 rounded-lg font-semibold ml-2">
                            Log Out
                        </button>
                        : <>
                            <Link to='/login'>
                                <button className="btn hidden xs:inline-block bg-[#7B68EE] text-[#FFFFFF] hover:bg-[#6A5ACD] border-none px-6 mr-5">Login</button>
                            </Link>
                            <Link to='/register'>
                                <button className="btn hidden xs:inline-block bg-[#FF6347] text-[#FFFFFF] hover:bg-[#CD5C5C] border-none px-6">Register</button>
                            </Link></>}



                </div>
            </div>
        </div>
    );
};

export default Navbar;