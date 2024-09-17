import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    const navLinks = <>
        <li><NavLink className={({ isActive }) => isActive ? "!bg-[#FFD700] !text-[#006400] hover:bg-[#FFD700] font-semibold hover:text-[#006400] active:!bg-[#8FBC8F] active:!text-[#FFFFF0] visited:bg-[#FFD700] visited:text-[#006400]" : "active:!bg-[#8FBC8F] active:!text-[#FFFFF0]"} to='/'>Home</NavLink></li>
        <li><NavLink className={({ isActive }) => isActive ? "!bg-[#FFD700] !text-[#006400] hover:bg-[#FFD700] font-semibold hover:text-[#006400] active:!bg-[#8FBC8F] active:!text-[#FFFFF0] visited:bg-[#FFD700] visited:text-[#006400]" : "active:!bg-[#8FBC8F] active:!text-[#FFFFF0]"} to='/all-spot'>All Spots</NavLink></li>
        <li><NavLink className={({ isActive }) => isActive ? "!bg-[#FFD700] !text-[#006400] hover:bg-[#FFD700] font-semibold hover:text-[#006400] active:!bg-[#8FBC8F] active:!text-[#FFFFF0] visited:bg-[#FFD700] visited:text-[#006400]" : "active:!bg-[#8FBC8F] active:!text-[#FFFFF0]"} to='/add-spot'>Add Spot</NavLink></li>
        <li><NavLink className={({ isActive }) => isActive ? "!bg-[#FFD700] !text-[#006400] hover:bg-[#FFD700] font-semibold hover:text-[#006400] active:!bg-[#8FBC8F] active:!text-[#FFFFF0] visited:bg-[#FFD700] visited:text-[#006400]" : "active:!bg-[#8FBC8F] active:!text-[#FFFFF0]"} to='/my-list'>My List</NavLink></li>


    </>
    return (
        <div className="navbar bg-[#228B22] text-white px-24">
            <div className="navbar-start">
                <div className="dropdown ">
                    <div tabIndex={0} role="button" className="btn btn-ghost  lg:hidden">
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
                        className="menu menu-sm dropdown-content !bg-[#228B22] opacity-75 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {
                            navLinks
                        }
                    </ul>
                </div>
                <a className="btn btn-ghost text-2xl">
                    <img className="h-8 w-8 mr-1" src="logo.png" alt="" />
                    ExploreSEAsia</a>
            </div>
            <div className="navbar-center hidden lg:flex font-medium">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                <Link to='/login'>
                    <button className="btn bg-[#001F3F] text-[#FFFFFF] hover:bg-[#191970] border-none px-6 mr-5">Login</button>
                </Link>
                <Link to='/register'>
                    <button className="btn bg-[#FF6347] text-[#FFFFFF] hover:bg-[#CD5C5C] border-none px-6">Register</button>
                </Link>

            </div>
        </div>
    );
};

export default Navbar;