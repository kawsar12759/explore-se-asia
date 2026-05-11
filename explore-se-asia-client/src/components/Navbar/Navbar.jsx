import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { FiMenu, FiMapPin, FiHeart } from "react-icons/fi";
import logo from "../../../public/logo.png";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [imageLoaded, setImageLoaded] = useState(false);
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate("/login", { state: { fromLogout: true } });
            })
            .catch(() => { });
    };

    const handleError = () => {
        setImageLoaded(true);
    };

    const navLinkClass = ({ isActive }) =>
        [
            "px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300",
            "flex items-center gap-2 whitespace-nowrap",
            isActive
                ? "bg-gradient-adventure text-white shadow-lg"
                : "text-gray-700 hover:text-adventure-600 hover:bg-adventure-50",
        ].join(" ");

    const navLinks = (
        <>
            <li>
                <NavLink to="/" className={navLinkClass}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/all-spots" className={navLinkClass}>
                    All Spots
                </NavLink>
            </li>

            {user && (
                <>
                    <li>
                        <NavLink to="/add-spot" className={navLinkClass}>
                            Add Spot
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/my-list" className={navLinkClass}>
                            My List
                        </NavLink>
                    </li>
                    <li className="inline-block sm:hidden">
                        <NavLink to="/update-profile" className={navLinkClass}>
                            Profile
                        </NavLink>
                    </li>
                </>
            )}

            {!user && (
                <>
                    <li className="inline-block xs:hidden">
                        <NavLink to="/login" className={navLinkClass}>
                            Login
                        </NavLink>
                    </li>
                    <li className="inline-block xs:hidden">
                        <NavLink to="/register" className={navLinkClass}>
                            Register
                        </NavLink>
                    </li>
                </>
            )}
        </>
    );

    return (
        <div className="sticky top-0 z-50 bg-white shadow-md border-b border-adventure-100">
            <div className="navbar px-4 sm:px-8 lg:px-16 mx-auto">
                <div className="navbar-start">
                    <div className="dropdown lg:hidden">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle text-adventure-600"
                        >
                            <FiMenu className="text-2xl" />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-xl rounded-xl w-64 bg-white border border-adventure-100"
                        >
                            {navLinks}
                            {!user && (
                                <div className="mt-3 flex flex-col gap-2">
                                    <Link to="/login">
                                        <button className="btn w-full btn-sm bg-gradient-adventure text-white border-none rounded-lg hover:shadow-lg">
                                            Login
                                        </button>
                                    </Link>
                                    <Link to="/register">
                                        <button className="btn w-full btn-sm btn-outline border-adventure-500 text-adventure-600 rounded-lg hover:bg-adventure-50">
                                            Register
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </ul>
                    </div>

                    <Link
                        to="/"
                        className="flex items-center gap-2 text-lg sm:text-xl font-bold"
                    >
                        <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-gradient-adventure flex items-center justify-center shadow-md">
                            <img className="h-6 w-6 object-contain" src={logo} alt="Logo" />
                        </div>
                        <span className="text-adventure-gradient hidden xs:inline">
                            ExploreSEAsia
                        </span>
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex font-medium">
                    <ul className="menu menu-horizontal gap-1 px-1">{navLinks}</ul>
                </div>

                <div className="navbar-end gap-2 sm:gap-4">
                    {user && (
                        <>
                            <Link
                                to="/update-profile"
                                className="hidden md:flex items-center gap-2 pr-2 hover:bg-adventure-50 p-2 rounded-lg transition-all duration-200"
                            >
                                <div className="text-right leading-tight hidden sm:block">
                                    <p className="text-sm font-semibold text-gray-800">{user.displayName}</p>
                                    <p className="text-xs text-adventure-500">Profile</p>
                                </div>
                                <div className="relative">
                                    <img
                                        className="w-10 h-10 rounded-full object-cover border-2 border-adventure-300 shadow-md"
                                        alt={user.displayName}
                                        src={
                                            imageLoaded
                                                ? "https://i.ibb.co.com/St8w19S/user.png"
                                                : user.photoURL
                                        }
                                        onError={handleError}
                                    />
                                </div>
                            </Link>
                        </>
                    )}

                    {user ? (
                        <button
                            onClick={handleLogOut}
                            className="btn btn-sm bg-gradient-adventure text-white border-none px-4 rounded-lg hover:shadow-lg transition-all duration-200"
                        >
                            Log Out
                        </button>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="btn btn-sm hidden xs:inline-flex bg-gradient-adventure text-white border-none px-4 rounded-lg hover:shadow-lg">
                                    Login
                                </button>
                            </Link>
                            <Link to="/register">
                                <button className="btn btn-sm hidden xs:inline-flex btn-outline border-2 border-adventure-500 text-adventure-600 px-4 rounded-lg hover:bg-adventure-50">
                                    Register
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
