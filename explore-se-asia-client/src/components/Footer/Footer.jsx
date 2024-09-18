import facebookLogo from '../../assets/facebook.png'
import twitterLogo from '../../assets/twitter.png'
import instaLogo from '../../assets/insta.png'
import youtubeLogo from '../../assets/youtube.png'
import logo from '../../../public/logo.png'
const Footer = () => {
    return (
        <footer className="bg-[#228B22] text-white py-10 px-16">
            <div className="mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
                {/* ExploreSEAsia Description */}
                <div className="col-span-1 md:col-span-2 pr-8">
                    <img className='h-14 w-14 mb-4' src={logo} alt="" />
                    <h3 className="text-2xl font-bold mb-4">ExploreSEAsia</h3>
                    <p className="text-sm">
                        Discover Southeast Asia's most beautiful places, hidden gems, and vibrant cities. Explore cultural wonders, adventure spots, and breathtaking landscapes.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="col-span-1">
                    <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                    <ul>
                        <li className="mb-2">
                            <a href="#home" className="hover:underline">Home</a>
                        </li>
                        <li className="mb-2">
                            <a href="#about" className="hover:underline">About Us</a>
                        </li>
                        <li className="mb-2">
                            <a href="#destinations" className="hover:underline">Destinations</a>
                        </li>
                        <li className="mb-2">
                            <a href="#contact" className="hover:underline">Contact Us</a>
                        </li>
                    </ul>
                </div>

                {/* Social Media */}
                <div className="col-span-1 min-w-fit">
                    <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700]">
                            <img className='h-8 w-8' src={facebookLogo} alt="" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700]">
                            <img className='h-8 w-8' src={twitterLogo} alt="" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700]">
                            <img className='h-8 w-8' src={instaLogo} alt="" />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700]">
                            <img className='h-8 w-8' src={youtubeLogo} alt="" />
                        </a>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="col-span-1">
                    <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                    <p className="text-sm">Email: info@exploreseasia.com</p>
                    <p className="text-sm">Phone: +123-456-7890</p>
                    <p className="text-sm">Address: 123 Southeast Asia Street, Adventure City</p>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-white mt-8 pt-6 text-center">
                <p className="text-sm">&copy; 2024 ExploreSEAsia. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;