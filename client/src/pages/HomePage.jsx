import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
            <h1 className="text-4xl font-bold text-primary">Welcome to Daffa Tour & Travel</h1>
            <p className="text-lg text-gray-600">Your trusted partner for Umrah, Hajj, and Holiday packages.</p>
            <Link to="/packages" className="px-6 py-2 text-white rounded-lg bg-secondary hover:bg-yellow-600 transition">
                Explore Packages
            </Link>
        </div>
    );
};

export default HomePage;
