import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="text-2xl font-bold text-primary">Daffa Travel</Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="text-gray-600 hover:text-primary">Home</Link>
                        <Link to="/packages" className="text-gray-600 hover:text-primary">Packages</Link>
                        {user ? (
                            <>
                                <Link to="/dashboard" className="text-gray-600 hover:text-primary">Dashboard</Link>
                                <button onClick={logout} className="text-red-500 hover:text-red-700">Logout</button>
                                <span className="text-sm font-semibold text-primary">{user.name}</span>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-600 hover:text-primary">Login</Link>
                                <Link to="/register" className="px-4 py-2 bg-primary text-white rounded hover:bg-teal-700">Register</Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-gray-600" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden pb-4 space-y-2">
                        <Link to="/" className="block text-gray-600 hover:text-primary" onClick={() => setIsOpen(false)}>Home</Link>
                        <Link to="/packages" className="block text-gray-600 hover:text-primary" onClick={() => setIsOpen(false)}>Packages</Link>
                        {user ? (
                            <>
                                <Link to="/dashboard" className="block text-gray-600 hover:text-primary" onClick={() => setIsOpen(false)}>Dashboard</Link>
                                <button onClick={() => { logout(); setIsOpen(false); }} className="block w-full text-left text-red-500 hover:text-red-700">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block text-gray-600 hover:text-primary" onClick={() => setIsOpen(false)}>Login</Link>
                                <Link to="/register" className="block text-gray-600 hover:text-primary" onClick={() => setIsOpen(false)}>Register</Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
