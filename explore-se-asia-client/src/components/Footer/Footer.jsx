import facebookLogo from "../../assets/facebook.png";
import twitterLogo from "../../assets/twitter.png";
import instaLogo from "../../assets/insta.png";
import youtubeLogo from "../../assets/youtube.png";
import logo from "../../../public/logo.png";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-14 px-5 sm:px-16 border-t-4 border-adventure-500 shadow-2xl">
            {/* Main grid */}
            <div className="mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Brand */}
                <div className="col-span-1">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-14 w-14 bg-gradient-adventure rounded-xl flex items-center justify-center shadow-lg">
                            <img src={logo} alt="SEAsia" className="h-10 w-10 object-contain" />
                        </div>
                        <h3 className="text-2xl font-bold text-adventure-gradient tracking-wide">
                            ExploreSEAsia
                        </h3>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed pr-6">
                        Discover Southeast Asia’s beauty — from hidden gems to iconic
                        destinations. Explore culture, adventure, and breathtaking landscapes.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-adventure-500">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        {[
                            ["Home", "/"],
                            ["About Us", "/about"],
                            ["Destinations", "/all-spots"],
                            ["Contact Us", "/contact"],
                        ].map(([label, link]) => (
                            <li key={label}>
                                <a
                                    href={link}
                                    className="text-gray-300 hover:text-adventure-500 transition-all duration-200 font-medium"
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-adventure-500">Follow Us</h4>
                    <div className="flex space-x-4">
                        {[facebookLogo, twitterLogo, instaLogo, youtubeLogo].map((icon, i) => (
                            <a
                                key={i}
                                href="#"
                                className="h-10 w-10 bg-adventure-500/20 rounded-lg p-2 flex items-center justify-center hover:bg-gradient-adventure hover:scale-110 transition-all duration-300 shadow-md"
                            >
                                <img src={icon} alt="" className="h-6 w-6" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-adventure-500">Contact Us</h4>
                    <p className="text-sm text-gray-300 mb-1">📧 info@exploreseasia.com</p>
                    <p className="text-sm text-gray-300 mb-1">📞 +123-456-7890</p>
                    <p className="text-sm text-gray-300">
                        📍 123 Southeast Asia Street, Adventure City
                    </p>
                </div>
            </div>

            {/* Bottom line */}
            <div className="border-t border-gray-700 mt-10 pt-6 text-center">
                <p className="text-sm text-gray-400">
                    © {currentYear} ExploreSEAsia — All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
