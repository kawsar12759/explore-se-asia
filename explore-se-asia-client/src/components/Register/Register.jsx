import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const { user, createUser, profileUpdate, setIsSigningUp } = useContext(AuthContext);
    useEffect(()=>{
        if(user){
            navigate('/');
        }
    },[user,navigate])
    const handleSignUp = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photo = e.target.photourl.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmpassword.value;





        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            toast.warning('Provide a valid email address');
            return;
        }
        else if (!/^https?:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(?:\/[^\s]*)?\.(?:jpg|jpeg|png|gif|bmp|webp)$/.test(photo)) {
            toast.warning('Provide a valid Photo URL');
            return;
        }
        else if (password.length < 6) {
            toast.warning('Password length must be at least 6 characters');
            return;
        }
        else if (password !== confirmPassword) {
            toast.warning('Please Make sure both the passwords are same');
            return;
        }
        else if (!/^(?=.*[a-z])(?=.*[A-Z]).*$/.test(password)) {
            toast.warning('Password must contain both lowercase and uppercase');
            return;
        }

        setIsSigningUp(true);
        createUser(email, password)
            .then(result => {
                profileUpdate(name, photo)
                    .then(() => {
                        setIsSigningUp(false);
                    })
                    .catch(error => {
                        // An error occurred
                        // ...
                    });
            })
            .catch(error => toast.error(error.message === "Firebase: Error (auth/email-already-in-use)." ? "Email already in use. Please try another one." : error.message));



    }
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center py-10 px-6">
            <ToastContainer />
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create Your Account</h2>
                <form onSubmit={handleSignUp}>
                    {/* Name Field */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#87CEEB]"
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#87CEEB]"
                            placeholder="https://example.com/photo.jpg"
                        />
                    </div>
                    {/* Password Field */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
                        <div className='relative'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder='Must contain both uppercase and lowercase'
                                className="w-full px-4 py-2 border placeholder:text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#87CEEB]"
                                required
                            />
                            <span onClick={() => setShowPassword(!showPassword)} className='absolute bottom-3 right-1 mb-0 cursor-pointer'>
                                {
                                    showPassword ? <FaEyeSlash className="w-8" /> : <FaEye className="w-8" />
                                }
                            </span>
                        </div>

                    </div>

                    {/* Confirm Password Field */}
                    <div className="mb-6">
                        <label htmlFor="confirm-password" className="block text-gray-700 text-sm font-semibold mb-2">Confirm Password</label>
                        <div className='relative'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirm-password"
                                name="confirmpassword"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#87CEEB]"
                                required
                            />
                            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='absolute bottom-3 right-1 mb-0 cursor-pointer'>
                                {
                                    showConfirmPassword ? <FaEyeSlash className="w-8" /> : <FaEye className="w-8" />
                                }
                            </span>
                        </div>
                    </div>



                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#00BFFF] text-white py-2 rounded-lg font-semibold hover:bg-[#4169E1]"
                    >
                        Register
                    </button>
                </form>

                {/* Already have an account? */}
                <div className="mt-6 text-center">
                    <p className="text-gray-600 text-sm">
                        Already have an account?
                        <a href="/login" className="text-[#87CEEB] font-semibold hover:underline"> Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;