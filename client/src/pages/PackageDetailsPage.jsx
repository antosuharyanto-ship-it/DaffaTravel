import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, Clock, Users, ArrowLeft, ShieldCheck, Info, Star, MapPin } from 'lucide-react';

const PackageDetailsPage = () => {
    const { id } = useParams();
    const { t, language } = useLanguage();
    const [pkg, setPkg] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [bookingStatus, setBookingStatus] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [reviewForm, setReviewForm] = useState({ rating: 5, content: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const [pkgRes, reviewsRes] = await Promise.all([
                    api.get(`/packages/${id}`),
                    api.get(`/testimonials?packageId=${id}`)
                ]);
                setPkg(pkgRes.data);
                // Filter reviews manually if backend doesn't support query yet
                setReviews(reviewsRes.data.filter(r => r.packageId === parseInt(id)));
            } catch (error) {
                console.error("Error fetching package details", error);
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

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!user) return alert('Please login to review');
        if (!reviewForm.content) return;

        setIsSubmitting(true);
        try {
            const res = await api.post('/testimonials', {
                ...reviewForm,
                packageId: parseInt(id)
            });
            setReviews([res.data, ...reviews]);
            setReviewForm({ rating: 5, content: '' });
            alert(t('reviews.success'));
        } catch (error) {
            console.error("Error submitting review", error);
            alert('Failed to submit review');
        } finally {
            setIsSubmitting(false);
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

    const stars = Array.from({ length: pkg.hotelStars || 5 }, (_, i) => i);

    return (
        <div className={`pb-20 pt-32 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <div className="container mx-auto px-4">
                <Link to="/packages" className={`inline-flex items-center text-primary font-bold hover:translate-x-1 transition-transform mb-8 group ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <ArrowLeft size={18} className={`${language === 'ar' ? 'ml-2 rotate-180' : 'mr-2'} group-hover:-translate-x-1 transition-transform`} />
                    {t('packages.back')}
                </Link>

                <div className={`grid lg:grid-cols-2 gap-12 ${language === 'ar' ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Left: Media & Gallery */}
                    <div className="space-y-6">
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[400px] md:h-[600px] group">
                            <img
                                src={pkg.flyerImage || pkg.image || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80'}
                                alt={pkg.title}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-6 py-2 rounded-2xl shadow-xl">
                                <span className="text-secondary font-black text-xs uppercase tracking-widest">{pkg.category}</span>
                            </div>
                            <div className="absolute bottom-6 right-6 flex space-x-1 bg-black/40 backdrop-blur-md px-3 py-2 rounded-xl">
                                {stars.map(n => <Star key={n} size={14} className="fill-yellow-400 text-yellow-400" />)}
                            </div>
                        </div>
                    </div>

                    {/* Right: Info & Booking */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-6xl font-serif text-slate-900 leading-[1.1] font-black">{pkg.title}</h1>
                            <div className={`flex items-center gap-6 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                                <div className="text-4xl font-serif font-black text-primary">
                                    <span className="text-sm opacity-50 mr-1">Rp</span>
                                    {new Intl.NumberFormat('id-ID').format(pkg.price)}
                                </div>
                                <span className="text-slate-400 font-medium italic underline decoration-secondary/30">/ person</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="glass-card !bg-slate-50 border-slate-100 p-6 rounded-3xl">
                                <span className="text-[10px] uppercase text-slate-400 tracking-wider mb-2 flex items-center font-bold">
                                    <Clock size={14} className={`${language === 'ar' ? 'ml-2' : 'mr-2'} text-secondary`} /> {t('packages.duration')}
                                </span>
                                <span className="text-lg font-serif font-black text-slate-800">{pkg.duration}</span>
                            </div>
                            <div className="glass-card !bg-slate-50 border-slate-100 p-6 rounded-3xl">
                                <span className="text-[10px] uppercase text-slate-400 tracking-wider mb-2 flex items-center font-bold">
                                    <Users size={14} className={`${language === 'ar' ? 'ml-2' : 'mr-2'} text-secondary`} /> {t('packages.availability')}
                                </span>
                                <span className="text-lg font-serif font-black text-slate-800">{pkg.availableSlots} Slots</span>
                            </div>
                            <div className="glass-card !bg-slate-50 border-slate-100 p-6 rounded-3xl">
                                <span className="text-[10px] uppercase text-slate-400 tracking-wider mb-2 flex items-center font-bold">
                                    <Calendar size={14} className={`${language === 'ar' ? 'ml-2' : 'mr-2'} text-secondary`} /> {t('packages.startDate')}
                                </span>
                                <span className="text-lg font-serif font-black text-slate-800">{new Date(pkg.startDate).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className={`text-xl font-bold flex items-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                                <Info size={20} className={`${language === 'ar' ? 'ml-2' : 'mr-2'} text-primary`} />
                                {t('packages.description')}
                            </h3>
                            <div className={`relative p-8 bg-slate-50 rounded-[2rem] border-l-4 border-secondary ${language === 'ar' ? 'border-l-0 border-r-4 text-right' : ''}`}>
                                <p className="text-slate-600 leading-relaxed text-lg font-light italic">
                                    "{pkg.description}"
                                </p>
                            </div>
                        </div>

                        <div className="pt-8">
                            {bookingStatus === 'booked' ? (
                                <div className={`p-8 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-3xl flex items-center shadow-lg animate-slide-up ${language === 'ar' ? 'flex-row-reverse shadow-emerald-500/10' : ''}`}>
                                    <ShieldCheck size={48} className={`${language === 'ar' ? 'ml-6' : 'mr-6'}`} />
                                    <div>
                                        <div className="font-serif font-black text-2xl">{t('packages.confirmed')}</div>
                                        <div className="text-sm opacity-80">{t('packages.confirmedNote')}</div>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={handleBooking}
                                    disabled={pkg.availableSlots <= 0}
                                    className="w-full btn-secondary !py-6 text-xl font-black uppercase tracking-[0.2em] flex items-center justify-center space-x-3 disabled:bg-slate-300 disabled:shadow-none shadow-2xl shadow-secondary/20 active:scale-95 transition-all"
                                >
                                    <span>{pkg.availableSlots > 0 ? t('packages.bookNow') : t('packages.soldOut')}</span>
                                </button>
                            )}
                            <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-6 opacity-60">
                                {t('packages.bookingNote')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-32 space-y-12">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl font-serif font-black text-slate-900 mb-4">{t('reviews.title')}</h2>
                        <p className="text-slate-500">{t('reviews.subtitle')}</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Review Form */}
                        <div className="lg:col-span-1">
                            {user ? (
                                <form onSubmit={handleReviewSubmit} className="bg-slate-50 p-8 rounded-[2rem] space-y-6 border border-slate-100 shadow-sm sticky top-32">
                                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-wider">{t('reviews.addReview')}</h3>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-3">{t('reviews.rating')}</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map(num => (
                                                <button
                                                    key={num}
                                                    type="button"
                                                    onClick={() => setReviewForm({ ...reviewForm, rating: num })}
                                                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${reviewForm.rating >= num ? 'bg-secondary text-white shadow-lg shadow-secondary/20' : 'bg-white text-slate-300 border border-slate-100'
                                                        }`}
                                                >
                                                    <Star size={18} fill={reviewForm.rating >= num ? "currentColor" : "none"} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-3">{t('reviews.comment')}</label>
                                        <textarea
                                            value={reviewForm.content}
                                            onChange={(e) => setReviewForm({ ...reviewForm, content: e.target.value })}
                                            className="w-full bg-white border border-slate-100 rounded-2xl p-4 min-h-[120px] focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-700"
                                            placeholder="..."
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !reviewForm.content}
                                        className="w-full btn-primary disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Posting...' : t('reviews.submit')}
                                    </button>
                                </form>
                            ) : (
                                <div className="bg-slate-50 p-8 rounded-[2rem] border border-dashed border-slate-300 text-center">
                                    <p className="text-slate-500 italic mb-4">Please login to share your experience</p>
                                    <Link to="/login" className="text-primary font-black uppercase text-xs tracking-widest">Login Now &rarr;</Link>
                                </div>
                            )}
                        </div>

                        {/* Reviews List */}
                        <div className="lg:col-span-2 space-y-6">
                            {reviews.length > 0 ? (
                                reviews.map(review => (
                                    <div key={review.id} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6">
                                        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 flex-shrink-0">
                                            <Users size={32} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <div className="font-serif font-black text-slate-900 uppercase tracking-wider">{review.name}</div>
                                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Verified Jamaah</div>
                                                </div>
                                                <div className="flex gap-0.5">
                                                    {[...Array(review.rating)].map((_, i) => (
                                                        <Star key={i} size={12} className="fill-secondary text-secondary" />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-slate-600 font-light italic leading-relaxed text-lg">
                                                "{review.content}"
                                            </p>
                                            <div className="mt-4 text-[10px] text-slate-300 font-black uppercase tracking-[0.2em]">
                                                {new Date(review.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-[3rem]">
                                    <p className="text-slate-400 font-serif italic text-xl">{t('reviews.noReviews')}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageDetailsPage;
