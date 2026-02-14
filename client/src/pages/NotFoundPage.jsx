import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-6xl font-bold text-gray-300">404</h1>
            <p className="text-xl text-gray-600 mt-4">Page Not Found</p>
            <Link to="/" className="mt-6 px-4 py-2 bg-primary text-white rounded hover:bg-teal-700">Go Home</Link>
        </div>
    );
};

export default NotFoundPage;
