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
                            <div className="flex flex-col">
                                <span className="text-xl font-serif font-black tracking-tighter leading-none">
                                    DAFFA <span className="text-secondary">TOUR</span>
                                </span>
                                <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">
                                    & TRAVEL
                                </span>
                            </div>
                        </Link>
                        <div className="space-y-1">
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                                PT. Andity Kreasi Mandiri
                            </p>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Merupakan biro perjalanan ibadah Umroh & Haji dengan berbagai pilihan paket yang bisa di sesuaikan dengan budget dan waktu keberangkatan anda dan keluarga.
                            </p>
                        </div>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/daffatour" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-secondary transition-colors text-white">
                                <Facebook size={18} />
                            </a>
                            <a href="https://www.instagram.com/daffa.umrah/" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-secondary transition-colors text-white">
                                <Instagram size={18} />
                            </a>
                            <a href="https://wa.me/6287768062507" className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center hover:opacity-80 transition-colors text-white">
                                <Phone size={18} />
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
                            {['Galeri Dokumentasi', 'Testimoni Jamaah', 'Blog & Artikel', 'Kantor Cabang'].map((item) => (
                                <li key={item} className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                                    <span className="hover:text-white transition-colors cursor-pointer">{item}</span>
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
                                <span>0877 6806 2507</span>
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
