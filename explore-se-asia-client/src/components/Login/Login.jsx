

const Login = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center py-10 px-6">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login to Your Account</h2>
                <form>
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
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#87CEEB]"
                            required
                        />
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
                        <a href="/forgot-password" className="text-[#87CEEB] font-semibold hover:underline">Forgot Password?</a>
                    </p>
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