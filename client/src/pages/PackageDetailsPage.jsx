import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const PackageDetailsPage = () => {
    const { id } = useParams();
    const [pkg, setPkg] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [bookingStatus, setBookingStatus] = useState(null);

    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/packages/${id}`);
                setPkg(res.data);
            } catch (error) {
                console.error("Error fetching package", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPackage();
    }, [id]);

    const handleBooking = async () => {
        if (!user) return alert('Please login to book');
        try {
            await axios.post('http://localhost:5000/api/transactions', { packageId: id });
            setBookingStatus('booked');
        } catch (error) {
            alert('Booking failed: ' + (error.response?.data?.error || error.message));
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!pkg) return <div>Package not found</div>;

    return (
        <div className="container mx-auto p-4">
            <Link to="/packages" className="text-secondary hover:underline">&larr; Back to Packages</Link>
            <div className="mt-4 grid md:grid-cols-2 gap-8">
                {pkg.image && <img src={pkg.image} alt={pkg.title} className="w-full rounded-lg shadow-md" />}
                <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">{pkg.title}</h1>
                    <p className="text-gray-600 mb-4">{pkg.description}</p>
                    <div className="mb-4">
                        <span className="font-semibold">Duration:</span> {pkg.duration}
                    </div>
                    <div className="mb-4">
                        <span className="font-semibold">Dates:</span> {new Date(pkg.startDate).toLocaleDateString()} - {new Date(pkg.endDate).toLocaleDateString()}
                    </div>
                    <div className="mb-4">
                        <span className="font-semibold">Available Slots:</span> {pkg.availableSlots}
                    </div>
                    <div className="text-2xl font-bold text-primary mb-6">${pkg.price}</div>

                    {bookingStatus === 'booked' ? (
                        <div className="p-4 bg-green-100 text-green-700 rounded">Booking Confirmed!</div>
                    ) : (
                        <button
                            onClick={handleBooking}
                            disabled={pkg.availableSlots <= 0}
                            className="px-6 py-3 bg-secondary text-white font-bold rounded hover:bg-yellow-600 transition disabled:bg-gray-400"
                        >
                            {pkg.availableSlots > 0 ? 'Book Now' : 'Sold Out'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PackageDetailsPage;
