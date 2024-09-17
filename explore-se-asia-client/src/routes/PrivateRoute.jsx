import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom";



const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    
    if (loading) {
        return <div className="h-screen flex w-full justify-center items-center"><div className="flex items-center w-28 justify-between"><span className="loading loading-bars loading-xs"></span>
            <span className="loading loading-bars loading-sm"></span>
            <span className="loading loading-bars loading-md"></span>
            <span className="loading loading-bars loading-lg"></span></div></div>;
    }
    if (user) {
        return children;
    }
    return <Navigate to='/login' state={{ fromProtected: true }} ></Navigate>;

};
export default PrivateRoute;