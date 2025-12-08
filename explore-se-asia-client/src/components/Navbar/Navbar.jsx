import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
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
      .catch(() => {});
  };

  const handleError = () => {
    setImageLoaded(true);
  };

  const navLinkClass = ({ isActive }) =>
    [
      "px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200",
      "flex items-center gap-2",
      isActive
        ? "bg-emerald-300/90 text-slate-900 shadow-sm"
        : "text-slate-100/80 hover:bg-emerald-500/20 hover:text-white",
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
              {user.displayName}
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
    <div className="sticky top-0 z-50 bg-gradient-to-r from-teal-900/80 via-teal-800/80 to-emerald-800/80 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="navbar px-4 sm:px-16 mx-auto text-white">
        <div className="navbar-start">
          <div className="dropdown xl:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-square"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-xl rounded-2xl w-56 bg-slate-900/95 border border-white/10 backdrop-blur-xl"
            >
              {navLinks}
              {!user && (
                <div className="mt-2 flex gap-2">
                  <Link to="/login" className="flex-1">
                    <button className="btn w-full btn-sm bg-indigo-500 hover:bg-indigo-400 border-none text-white rounded-xl">
                      Login
                    </button>
                  </Link>
                  <Link to="/register" className="flex-1">
                    <button className="btn w-full btn-sm bg-rose-500 hover:bg-rose-400 border-none text-white rounded-xl">
                      Register
                    </button>
                  </Link>
                </div>
              )}
            </ul>
          </div>

          <Link
            to="/"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold tracking-tight"
          >
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-2xl bg-white/90 flex items-center justify-center shadow-md">
              <img className="h-7 w-7 object-contain" src={logo} alt="Logo" />
            </div>
            <span className="bg-gradient-to-r from-amber-300 via-white to-emerald-200 bg-clip-text text-transparent">
              ExploreSEAsia
            </span>
          </Link>
        </div>

        <div className="navbar-center hidden xl:flex font-medium">
          <ul className="menu menu-horizontal gap-1 px-1">{navLinks}</ul>
        </div>

        <div className="navbar-end gap-3">
          {user && (
            <>
              <Link
                to="/update-profile"
                className="hidden md:flex items-center gap-3 pr-1"
              >
                <div className="text-right leading-tight">
                  <p className="text-sm font-semibold">{user.displayName}</p>
                  <p className="text-xs text-emerald-100/80">
                    View profile & settings
                  </p>
                </div>
                <div className="relative">
                  <img
                    className="w-11 h-11 rounded-full object-cover border border-emerald-300/80 shadow-md hidden sm:block"
                    alt={user.displayName}
                    src={
                      imageLoaded
                        ? "https://i.ibb.co.com/St8w19S/user.png"
                        : user.photoURL
                    }
                    onError={handleError}
                  />
                  <span className="hidden sm:block absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-slate-900" />
                </div>
              </Link>
            </>
          )}

          {user ? (
            <button
              onClick={handleLogOut}
              className="btn bg-rose-500 hover:bg-rose-400 border-none px-4 sm:px-5 py-1 sm:py-2 rounded-2xl text-sm font-semibold shadow-md shadow-rose-900/40"
            >
              Log Out
            </button>
          ) : (
            <>
              <Link to="/login">
                <button className="btn hidden xs:inline-flex bg-indigo-500 hover:bg-indigo-400 border-none px-5 rounded-2xl text-sm font-semibold shadow-md shadow-indigo-900/40">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="btn hidden xs:inline-flex bg-rose-500 hover:bg-rose-400 border-none px-5 rounded-2xl text-sm font-semibold shadow-md shadow-rose-900/40">
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
