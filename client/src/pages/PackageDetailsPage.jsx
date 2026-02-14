import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, Users, ArrowLeft, ShieldCheck, Info } from 'lucide-react';

const PackageDetailsPage = () => {
    const { id } = useParams();
    const [pkg, setPkg] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [bookingStatus, setBookingStatus] = useState(null);

    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const res = await api.get(`/packages/${id}`);
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
            await api.post('/transactions', { packageId: id });
            setBookingStatus('booked');
        } catch (error) {
            alert('Booking failed: ' + (error.response?.data?.error || error.message));
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!pkg) return <div className="p-20 text-center font-serif text-2xl text-slate-400">Package not found</div>;

    return (
        <div className="pb-20 pt-32">
            <div className="container mx-auto px-4">
                <Link to="/packages" className="inline-flex items-center text-primary font-bold hover:translate-x-1 transition-transform mb-8 group">
                    <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Packages
                </Link>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left: Media & Gallery */}
                    <div className="space-y-6">
                        <div className="rounded-3xl overflow-hidden shadow-2xl h-[500px]">
                            <img
                                src={pkg.image || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80'}
                                alt={pkg.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {[1, 2, 3].map(n => (
                                <div key={n} className="h-24 bg-slate-200 rounded-xl animate-pulse"></div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Info & Booking */}
                    <div className="space-y-8">
                        <div>
                            <span className="px-4 py-1 bg-secondary text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg mb-4 inline-block">
                                {pkg.category}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-4">{pkg.title}</h1>
                            <div className="text-3xl font-bold text-primary">${pkg.price} <span className="text-sm text-slate-400 font-normal">/ person</span></div>
                        </div>

                        <div className="glass-card p-6 grid grid-cols-2 md:grid-cols-3 gap-6">
                            <div className="flex flex-col">
                                <span className="text-xs uppercase text-slate-400 tracking-wider mb-1 flex items-center">
                                    <Clock size={12} className="mr-1" /> Duration
                                </span>
                                <span className="font-bold text-slate-800">{pkg.duration}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs uppercase text-slate-400 tracking-wider mb-1 flex items-center">
                                    <Users size={12} className="mr-1" /> Availability
                                </span>
                                <span className="font-bold text-slate-800">{pkg.availableSlots} Slots</span>
                            </div>
                            <div className="flex flex-col col-span-2 md:col-span-1">
                                <span className="text-xs uppercase text-slate-400 tracking-wider mb-1 flex items-center">
                                    <Calendar size={12} className="mr-1" /> Start Date
                                </span>
                                <span className="font-bold text-slate-800">{new Date(pkg.startDate).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold flex items-center">
                                <Info size={20} className="mr-2 text-primary" />
                                Description
                            </h3>
                            <p className="text-slate-600 leading-bold text-lg leading-relaxed italic border-l-4 border-secondary pl-6 py-2">
                                {pkg.description}
                            </p>
                        </div>

                        <div className="pt-8">
                            {bookingStatus === 'booked' ? (
                                <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl flex items-center shadow-sm">
                                    <ShieldCheck size={32} className="mr-4" />
                                    <div>
                                        <div className="font-bold text-lg">Booking Confirmed!</div>
                                        <div className="text-sm opacity-80">Our agent will contact you shortly to finalize details.</div>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={handleBooking}
                                    disabled={pkg.availableSlots <= 0}
                                    className="w-full btn-secondary !py-5 text-xl uppercase tracking-widest flex items-center justify-center space-x-3 disabled:bg-slate-300 disabled:shadow-none"
                                >
                                    <span>{pkg.availableSlots > 0 ? 'Book This Journey' : 'Sold Out'}</span>
                                </button>
                            )}
                            <p className="text-center text-slate-400 text-xs mt-4">
                                No credit card required. Our sales agent will verify your booking first.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageDetailsPage;
