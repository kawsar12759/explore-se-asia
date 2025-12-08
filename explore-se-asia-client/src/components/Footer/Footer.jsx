import facebookLogo from "../../assets/facebook.png";
import twitterLogo from "../../assets/twitter.png";
import instaLogo from "../../assets/insta.png";
import youtubeLogo from "../../assets/youtube.png";
import logo from "../../../public/logo.png";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-gradient-to-r from-teal-900/90 via-teal-800/90 to-emerald-900/90 text-white py-14 px-5 sm:px-16 backdrop-blur-xl border-t border-white/10 shadow-2xl">
            {/* Main grid */}
            <div className="mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Brand */}
                <div className="col-span-1">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-14 w-14 bg-white/90 rounded-2xl flex items-center justify-center shadow-lg">
                            <img src={logo} alt="SEAsia" className="h-10 w-10 object-contain" />
                        </div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-300 to-emerald-200 bg-clip-text text-transparent tracking-wide">
                            ExploreSEAsia
                        </h3>
                    </div>
                    <p className="text-sm text-emerald-100/80 leading-relaxed pr-6">
                        Discover Southeast Asia’s beauty — from hidden gems to iconic
                        destinations. Explore culture, adventure, and breathtaking landscapes.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-emerald-200">Quick Links</h4>
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
                                    className="text-emerald-100/80 hover:text-amber-300 transition-all duration-200"
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-emerald-200">Follow Us</h4>
                    <div className="flex space-x-4">
                        {[facebookLogo, twitterLogo, instaLogo, youtubeLogo].map((icon, i) => (
                            <a
                                key={i}
                                href="#"
                                className="h-10 w-10 bg-white/10 rounded-xl p-2 flex items-center justify-center
                           hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-md"
                            >
                                <img src={icon} alt="" className="h-6 w-6" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-emerald-200">Contact Us</h4>
                    <p className="text-sm text-emerald-100/80 mb-1">📧 info@exploreseasia.com</p>
                    <p className="text-sm text-emerald-100/80 mb-1">📞 +123-456-7890</p>
                    <p className="text-sm text-emerald-100/80">
                        📍 123 Southeast Asia Street, Adventure City
                    </p>
                </div>
            </div>

            {/* Bottom line */}
            <div className="border-t border-white/10 mt-10 pt-6 text-center">
                <p className="text-sm text-emerald-100/70">
                    © {currentYear} ExploreSEAsia — All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
