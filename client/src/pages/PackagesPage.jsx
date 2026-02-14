import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PackagesPage = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/packages');
                setPackages(res.data);
            } catch (error) {
                console.error("Error fetching packages", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    if (loading) return <div className="p-8 text-center">Loading packages...</div>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6 text-center text-primary">Available Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                    <div key={pkg.id} className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                        {pkg.image && <img src={pkg.image} alt={pkg.title} className="w-full h-48 object-cover" />}
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{pkg.title}</h3>
                            <p className="text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-primary">${pkg.price}</span>
                                <Link to={`/packages/${pkg.id}`} className="px-4 py-2 bg-accent text-white rounded hover:bg-teal-600">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PackagesPage;
