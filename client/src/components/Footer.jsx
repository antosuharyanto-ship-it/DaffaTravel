import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../assets/logo/daffa_logo_main.png';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white pt-20 pb-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-8">
                        <Link to="/" className="flex items-center space-x-4">
                            <div className="h-14 w-14 rounded-2xl overflow-hidden bg-white p-2 shadow-2xl">
                                <img src={logo} alt="Daffa Travel" className="h-full w-full object-contain" />
                            </div>
                            <span className="text-2xl font-serif font-black tracking-[-0.05em] leading-none">
                                DAFFA <span className="text-secondary italic">TOUR</span>
                            </span>
                        </Link>
                        <div className="space-y-4">
                            <p className="text-secondary text-[10px] font-black uppercase tracking-[0.2em]">
                                PT. Andity Kreasi Mandiri
                            </p>
                            <p className="text-slate-400 text-sm leading-relaxed font-light">
                                Experience spiritual serenity with Indonesia's premier Umrah & Hajj agency. We craft every detail of your journey with devotion and excellence.
                            </p>
                        </div>
                        <div className="flex space-x-5">
                            <a href="https://www.facebook.com/daffatour" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all duration-300 text-white shadow-xl">
                                <Facebook size={20} />
                            </a>
                            <a href="https://www.instagram.com/daffa.umrah/" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all duration-300 text-white shadow-xl">
                                <Instagram size={20} />
                            </a>
                            <a href="https://wa.me/628161616372" className="w-12 h-12 rounded-2xl bg-[#25D366]/20 border border-[#25D366]/30 flex items-center justify-center hover:bg-[#25D366] transition-all duration-300 text-white shadow-xl">
                                <Phone size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-secondary tracking-wider uppercase text-sm">Layanan Kami</h4>
                        <ul className="space-y-3 text-slate-400 text-sm">
                            {['Pilihan Paket Umroh', 'Pilihan Paket Haji', 'Pilihan Paket Wisata', 'Paket Umroh Private', 'Paket Umroh Ramadhan', 'Reservasi Tiket Umroh', 'Hotel Makkah Madinah', 'Reservasi Paket LA Umroh'].map((item) => (
                                <li key={item} className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                                    <span className="hover:text-white transition-colors cursor-pointer">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-secondary tracking-wider uppercase text-sm">Dokumentasi</h4>
                        <ul className="space-y-3 text-slate-400 text-sm">
                            {[
                                { name: 'Galeri Dokumentasi', path: '/gallery' },
                                { name: 'Testimoni Jamaah', path: '/' }, // HomePage auto-scrolls or has section
                                { name: 'Blog & Artikel', path: '/articles' },
                                { name: 'Kantor Cabang', path: '/contact' }
                            ].map((item) => (
                                <li key={item.name} className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                                    <Link to={item.path} className="hover:text-white transition-colors cursor-pointer">{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-secondary tracking-wider uppercase text-sm">Kantor Pusat</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li className="flex items-start space-x-3">
                                <MapPin size={18} className="text-secondary shrink-0" />
                                <div>
                                    <span className="block font-bold text-white">Sudirman Park</span>
                                    <span>Tower B unit B 31 CJ</span><br />
                                    <span>Jl. KH. Mas Mansyur Kav. 35</span><br />
                                    <span>Karet Tengsin Tanah Abang, Jakarta Pusat 10250</span>
                                </div>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone size={18} className="text-secondary shrink-0" />
                                <span>0816 1616 372</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail size={18} className="text-secondary shrink-0" />
                                <span>daffatourstravel3@gmail.com</span>
                            </li>
                            <li className="pt-4 border-t border-slate-800">
                                <a href="https://daffatourtravel.com/" className="text-secondary font-bold hover:underline">
                                    daffatourtravel.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs gap-4 text-center">
                    <div>
                        <p>&copy; {new Date().getFullYear()} Daffa Tours and travel. All rights reserved.</p>
                        <p className="mt-1">
                            Powered by <a href="https://www.Mastery-ai.net" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Mastery-AI</a>
                        </p>
                    </div>
                    <div className="space-x-6">
                        <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
