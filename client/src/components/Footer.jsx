import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../assets/logo/daffa_logo_main.png';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white pt-20 pb-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center space-x-3">
                            <div className="h-12 w-12 rounded-xl overflow-hidden bg-white p-1">
                                <img src={logo} alt="Daffa Travel" className="h-full w-full object-contain" />
                            </div>
                            <span className="text-2xl font-serif font-black tracking-tighter">
                                DAFFA <span className="text-secondary">TRAVEL</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed italic">
                            "A sacred journey crafted with care, expertise, and a commitment to your spiritual well-being."
                        </p>
                        <div className="flex space-x-4">
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-secondary transition-colors text-white">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            {['Home', 'Packages', 'About Us', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link to={`/${item.toLowerCase().replace(' ', '')}`} className="hover:text-secondary transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Our Services</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li>Umrah Premium Packages</li>
                            <li>Hajj Plus Services</li>
                            <li>Muslim-friendly Holidays</li>
                            <li>Visa & Document Handling</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li className="flex items-start space-x-3">
                                <MapPin size={18} className="text-secondary shrink-0" />
                                <span>Jakarta, Indonesia - Official Branch 1</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone size={18} className="text-secondary shrink-0" />
                                <span>+62 123 4567 890</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail size={18} className="text-secondary shrink-0" />
                                <span>info@daffatravel.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs gap-4 text-center">
                    <p>&copy; {new Date().getFullYear()} Daffa Tour & Travel (Biro Perjalanan Umroh & Haji Khusus). All rights reserved.</p>
                    <div className="space-x-6">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
