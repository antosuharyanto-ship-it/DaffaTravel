import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import logo from '../assets/logo/daffa_logo_main.png';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isHome = location.pathname === '/';

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white shadow-lg py-2' : (isHome ? 'bg-transparent py-4' : 'bg-white shadow-md py-4')
            }`}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center space-x-4 group">
                        <div className="h-12 w-12 md:h-16 md:w-16 rounded-2xl overflow-hidden shadow-2xl group-hover:scale-105 transition-all duration-500 bg-white p-1.5 ring-1 ring-slate-100">
                            <img src={logo} alt="Daffa Travel Logo" className="h-full w-full object-contain" />
                        </div>
                        <div className="flex flex-col">
                            <span className={`text-xl md:text-3xl font-serif font-black tracking-[-0.04em] leading-none ${scrolled || !isHome ? 'text-slate-900' : 'text-white'
                                }`}>
                                DAFFA <span className="text-secondary italic">TRAVEL</span>
                            </span>
                            <span className={`text-[9px] md:text-[11px] uppercase tracking-[0.3em] font-extrabold ${scrolled || !isHome ? 'text-slate-500' : 'text-slate-300'}`}>
                                Biro Perjalanan Umroh & Haji
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-10">
                        {['Home', 'Packages', 'About', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                className={`text-[13px] font-bold tracking-[0.1em] uppercase hover:text-secondary transition-all duration-300 relative group/link ${scrolled || !isHome ? 'text-slate-800' : 'text-white'
                                    }`}
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover/link:w-full"></span>
                            </Link>
                        ))}
                        <div className="h-6 w-px bg-slate-300/30 mx-2"></div>
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/dashboard"
                                    className={`flex items-center space-x-2 text-sm font-semibold tracking-wide uppercase ${scrolled || !isHome ? 'text-primary' : 'text-white hover:text-secondary'
                                        }`}
                                >
                                    <User size={18} />
                                    <span>{user.name}</span>
                                </Link>
                                <button
                                    onClick={logout}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                    title="Logout"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-6">
                                <Link
                                    to="/login"
                                    className={`text-[13px] font-bold tracking-[0.1em] uppercase hover:text-secondary transition-colors ${scrolled || !isHome ? 'text-slate-800' : 'text-white'
                                        }`}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-secondary hover:bg-amber-600 text-white px-8 py-3 rounded-full text-[13px] font-bold uppercase tracking-[0.1em] shadow-xl shadow-secondary/20 hover:shadow-secondary/40 transform hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={`md:hidden p-2 rounded-lg ${scrolled || !isHome ? 'text-slate-700 bg-slate-100' : 'text-white bg-white/20 backdrop-blur-sm'
                            }`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-2xl transition-all duration-300 origin-top ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
                    }`}>
                    <div className="flex flex-col p-6 space-y-4">
                        {['Home', 'Packages', 'About', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                className="text-xl font-semibold text-slate-800 hover:text-primary transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}
                        <hr className="border-slate-100" />
                        {user ? (
                            <>
                                <Link to="/dashboard" className="flex items-center space-x-2 text-primary font-bold" onClick={() => setIsOpen(false)}>
                                    <User size={20} />
                                    <span>{user.name}'s Dashboard</span>
                                </Link>
                                <button onClick={() => { logout(); setIsOpen(false); }} className="flex items-center space-x-2 text-red-500 font-semibold uppercase tracking-wider text-sm">
                                    <LogOut size={20} />
                                    <span>Logout Account</span>
                                </button>
                            </>
                        ) : (
                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <Link
                                    to="/login"
                                    className="text-center py-3 font-bold text-slate-700 bg-slate-100 rounded-xl"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="text-center py-3 font-bold text-white bg-primary rounded-xl"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
