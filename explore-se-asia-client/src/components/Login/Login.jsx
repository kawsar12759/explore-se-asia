import { useContext, useEffect, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../providers/AuthProvider";

const Login = () => {
    const { user, signInWithEmail, signInWithGoogle, forgetPass } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const emailRef = useRef();
    const location = useLocation();
    const showToast = location.state?.fromProtected;
    const fromLogout = location.state?.fromLogout;
    useEffect(() => {
        if (showToast && !fromLogout) {
            toast.info('Please sign in to gain full access.');
            navigate('/login', { replace: true, state: {} });
        }
    }, [showToast, fromLogout, navigate]);
    useEffect(()=>{
        if(user){
            navigate('/');
        }
    },[user,navigate])
    const handleLogIn = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        signInWithEmail(email,password)
        .then(result => {
            // Signed in 
            console.log(result.user);

        })
        .catch((error) => {
            toast.error(error.message === "Firebase: Error (auth/invalid-credential)." ? 'Invalid credentials! Please try again.' : error.message)
            console.error(error.message);
        });
    }

    const handleGoogleLogin = () =>{
        signInWithGoogle()
        .then(result => {
            console.log(result.user);
        })
        .catch(error => {
            toast.error(error.message);
        })
    }
    const handleForgetPass = () => {
        const emailForReset = emailRef.current.value;
        console.log(emailForReset);
        if (emailForReset === '') {
            console.log('Returned');
            return;
        }


        forgetPass(emailForReset)
            .then(() => {
                // Password reset email sent!
                // ..\
                toast.info('A password reset link has been sent to your email.');
            })
            .catch((error) => {

                // ..
            });


    }

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center py-10 px-6">
            <ToastContainer />
            <dialog id="my_modal_5" className="modal  modal-bottom sm:modal-middle">

                <div className="modal-box">
                    <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>
                    <hr className="text-black mb-3" />
                    <form method="dialog" >
                        <div className="form-control mb-4">
                            <label className="label mb-4">
                                <span className="label-text text-base font-medium">Enter the email associated with your account to receive a password reset link</span>
                            </label>
                            <input type="email" name="emailforreset" ref={emailRef} placeholder="Enter Your Email" className="input input-bordered mb-3" />

                        </div>
                        <hr className="mb-3" />
                        <div className="flex justify-end">
                            <button className="btn bg-[#F3F4F6] text-[#374151] hover:bg-[#E5E7EB] hover:text-[#111827] mr-3">Cancel</button>
                            <button onClick={handleForgetPass} className="btn bg-[#00BFFF] text-[#FFFFFF] hover:bg-[#4169E1] hover:text-[#F9FAFB]">Reset Password</button>
                        </div>


                    </form>
                </div>
            </dialog>

            <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login to Your Account</h2>
                <form onSubmit={handleLogIn}>
                    {/* Email Field */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#87CEEB]"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#87CEEB]"
                                required
                            />
                            <span onClick={() => setShowPassword(!showPassword)} className='absolute bottom-3 right-1 mb-0 cursor-pointer'>
                                {
                                    showPassword ? <FaEyeSlash className="w-8" /> : <FaEye className="w-8" />
                                }
                            </span>
                        </div>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#00BFFF] text-white py-2 rounded-lg font-semibold hover:bg-[#4169E1]"
                    >
                        Login
                    </button>
                </form>

                {/* Forgot Password and Register Links */}
                <div className="mt-6 text-center">
                    <p className="text-gray-600 text-sm mb-4">
                        <a onClick={() => document.getElementById('my_modal_5').showModal()} className="text-[#87CEEB] font-semibold hover:underline cursor-pointer">Forgot Password?</a>
                    </p>
                    <div className="mb-8">
                        <div className="flex items-center mb-4 w-3/4 mx-auto">
                            <div className="w-full h-px bg-gray-300"></div>
                            <span className="mx-3 text-gray-500">or</span>
                            <div className="w-full h-px bg-gray-300"></div>
                        </div>
                        <div className="">
                            <button onClick={handleGoogleLogin} className="btn bg-[#F9FAFB] text-[#00BFFF] border-2 border-[#00BFFF] hover:bg-[#4169E1] hover:text-[#FFFFFF] hover:border-[#4169E1] w-full"><FcGoogle className="text-2xl" />Sign In with Google</button>
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                        Don't have an account?
                        <a href="/register" className="text-[#87CEEB] font-semibold hover:underline"> Register</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;